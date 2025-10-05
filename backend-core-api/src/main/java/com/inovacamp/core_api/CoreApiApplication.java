package com.inovacamp.core_api;

import com.amazonaws.services.s3.AmazonS3;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CoreApiApplication {
    @Autowired
    private AmazonS3 s3;

    @PostConstruct
    public void testMinio() {
        System.out.println("Listing buckets:");
        s3.listBuckets().forEach(b -> System.out.println(b.getName()));

        String bucket = "kyc-documents";
        String key = "test.txt";
        s3.putObject(bucket, key, "Hello MinIO!");
        System.out.println("Uploaded successfully!");
    }


    public static void main(String[] args) {
        SpringApplication.run(CoreApiApplication.class, args);
	}

}
