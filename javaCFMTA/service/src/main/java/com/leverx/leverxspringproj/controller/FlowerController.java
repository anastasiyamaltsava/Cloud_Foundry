package com.leverx.leverxspringproj.controller;

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController; 
 
import com.leverx.leverxspringproj.domain.Flower;
import com.leverx.leverxspringproj.service.FlowerService;

@RestController
public class FlowerController {

	@Autowired
	private FlowerService FlowerService; 
	   
	@GetMapping(value="/Flower")  
	public List<Flower> getAllFlower() {
		return FlowerService.getFlowerAll(); 
	}    
	
	@GetMapping(value="/Flower/{flid}")  
	public Flower getFlower(@PathVariable Long flid) {
		return FlowerService.getFlower(flid);
	}    
	
	@PostMapping(value="/Flower")  
	public void createFlower(@RequestBody Flower Flower) {
		FlowerService.createFlower(Flower);  
	}    
	
	@DeleteMapping(value="/Flower/{flid}")  
	public void deleteFlower(@PathVariable Long flid) {
		FlowerService.deleteFlower(flid);  
	}    
	
	@PutMapping(value="/Flower")  
	public void updateFlower(@RequestBody Flower Flower) {
		FlowerService.updateFlower(Flower);  
	}
	
}
