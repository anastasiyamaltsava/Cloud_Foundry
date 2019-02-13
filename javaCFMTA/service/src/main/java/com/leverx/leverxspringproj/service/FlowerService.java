package com.leverx.leverxspringproj.service;

import java.util.List;
import java.util.Optional; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; 
 
import com.leverx.leverxspringproj.dao.FlowerDao;
import com.leverx.leverxspringproj.domain.Flower; 

@Service
public class FlowerService {

	@Autowired
	private FlowerDao FlowerDao;
	
	public List<Flower> getFlowerAll() {
		return FlowerDao.getAll();
	}
	
	public Flower getFlower(Long id) {
		Optional<Flower> FlowerOptional = this.FlowerDao.getById(id);
		Flower Flower = null;
		if(FlowerOptional.isPresent()) {
			Flower = FlowerOptional.get();
		}
		return Flower;
	}
	
	public void createFlower(Flower Flower) {
		this.FlowerDao.save(Flower);
	}
	
	public void updateFlower(Flower Flower) {
		this.FlowerDao.update(Flower);
	}
	
	public void deleteFlower(Long id) {
		this.FlowerDao.delete(id);
	}
	
}
