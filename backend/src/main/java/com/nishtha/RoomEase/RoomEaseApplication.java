package com.nishtha.RoomEase;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class RoomEaseApplication {

	@Value("${spring.datasource.url:NOT_FOUND}")
	private String datasourceUrl;

	@Bean
	CommandLineRunner testProperties() {
		return args -> System.out.println("Datasource URL = " + datasourceUrl);
	}

	public static void main(String[] args) {

		SpringApplication.run(RoomEaseApplication.class, args);
	}

}
