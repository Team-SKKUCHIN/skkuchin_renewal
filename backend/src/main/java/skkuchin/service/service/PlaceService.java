package skkuchin.service.service;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import skkuchin.service.dto.PlaceDto;
import skkuchin.service.domain.Map.*;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.*;

import javax.transaction.Transactional;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlaceService {
    private static final String CATEGORY = "place";
    private final PlaceRepo placeRepo;
    private final ImageRepo imageRepo;
    private final S3Service s3Service;

    @Transactional
    public List<PlaceDto.Response> getAll() {

        return placeRepo.findAll()
                .stream()
                .map(place -> new PlaceDto.Response(
                        place,
                        imageRepo.findByPlace(place)))
                .collect(Collectors.toList());
    }

    @Transactional
    public PlaceDto.Response getDetail(Long placeId) {
        Place place = placeRepo.findById(placeId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 장소입니다"));
        List<Image> images = imageRepo.findByPlace(place);
        return new PlaceDto.Response(place, images);
    }

    @Transactional
    public void add(PlaceDto.PostRequest dto) {
        List<Image> placeImages = new ArrayList<>();

        Place place = dto.toEntity();
        placeRepo.save(place);

        for (MultipartFile image : dto.getImages()) {
            if (!image.isEmpty()) {
                String url = s3Service.uploadObject(image, CATEGORY, place.getCampus().name(), place.getName());
                Image placeImage = Image.builder().place(place).url(url).build();
                placeImages.add(placeImage);
            }
        }
        if (placeImages.size() > 0) {
            imageRepo.saveAll(placeImages);
        }
    }

    @Transactional
    public void addAll(List<PlaceDto.PostRequest> dto) {
        List<Place> places = dto.stream().map(placeDto -> placeDto.toEntity()).collect(Collectors.toList());
        placeRepo.saveAll(places);
    }

    @Transactional
    public void update(Long placeId, PlaceDto.PutRequest dto) {
        List<Image> newImages = new ArrayList<>();

        Place existingPlace = placeRepo.findById(placeId).orElseThrow();
        BeanUtils.copyProperties(dto, existingPlace);
        placeRepo.save(existingPlace);

        List<Image> existingImages = imageRepo.findByPlace(existingPlace);

        // s3에 업로드 후 newImages 배열에 url 정보 저장
        for (MultipartFile image : dto.getImages()) {
            if (!image.isEmpty()) {
                String url = s3Service.uploadObject(image, CATEGORY, existingPlace.getCampus().name(),
                        existingPlace.getName());
                Image newImage = Image.builder().place(existingPlace).url(url).build();
                newImages.add(newImage);
            }
        }

        if (newImages.size() > 0) {
            imageRepo.saveAll(newImages);
        }

        // 기존 image url 중 없어진 url 삭제
        for (Image existingImage : existingImages) {
            if (!dto.getUrls().contains(existingImage.getUrl())) {
                s3Service.deleteObject(existingImage.getUrl());
                imageRepo.delete(existingImage);
            }
        }
    }

    @Transactional
    public void delete(Long placeId) {
        Place place = placeRepo.findById(placeId).orElseThrow();

        List<Image> existingImages = imageRepo.findByPlace(place);

        placeRepo.delete(place);

        for (Image existingImage : existingImages) {
            s3Service.deleteObject(existingImage.getUrl());
        }
    }

    @Transactional
    public List<PlaceDto.AdminResponse> getNoReview() {
        List<Place> places = placeRepo.findNoReviewPlaces();
        return places
                .stream()
                .map(PlaceDto.AdminResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<PlaceDto.AdminResponse> getNoImage() {
        List<Place> places = placeRepo.findNoImagePlaces();
        return places
                .stream()
                .map(PlaceDto.AdminResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<PlaceDto.AdminResponse> getNoMenu() {
        List<Place> places = placeRepo.findNoMenuPlaces();
        return places
                .stream()
                .map(PlaceDto.AdminResponse::new)
                .collect(Collectors.toList());
    }

    public void insertData(String path) throws IOException, ParseException {
        if (placeRepo.count() < 1) { // db가 비어있을 때만 실행
            String[] campusNames = { "명륜", "율전" };

            for (String campusName : campusNames) {
                FileInputStream ins = new FileInputStream(path + "place_" + campusName + ".json");
                JSONParser parser = new JSONParser();
                JSONObject jsonObject = (JSONObject) parser.parse(
                        new InputStreamReader(ins, StandardCharsets.UTF_8));
                JSONArray jsonArray = (JSONArray) jsonObject.get("place");
                Gson gson = new Gson();

                for (Object o : jsonArray) {
                    JSONObject temp = (JSONObject) o;
                    PlaceDto.PostRequest dto = gson.fromJson(temp.toString(), PlaceDto.PostRequest.class);
                    placeRepo.save(dto.toEntity());
                }
            }
        }
    }
}
