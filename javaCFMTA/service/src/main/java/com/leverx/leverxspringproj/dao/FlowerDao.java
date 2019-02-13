package com.leverx.leverxspringproj.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional; 

import javax.sql.DataSource; 
 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository; 
 
import com.leverx.leverxspringproj.dao.intfce.IFlowerDao;
import com.leverx.leverxspringproj.domain.Flower; 
 
@Repository
public class FlowerDao implements IFlowerDao {
	private static final Logger logger = LoggerFactory.getLogger(FlowerDao.class); 
	
	@Autowired  
	private DataSource dataSource; 
	
	@Override  
	public Optional<Flower> getById(Long id) {
		Optional<Flower> entity = null;
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"SELECT TOP 1 \"flid\", \"name\" FROM \"javaCFMTA::Flower\" WHERE \"flid\" = ?")) {
			stmnt.setLong(1, id);
			ResultSet result = stmnt.executeQuery();
			if (result.next()) {
				Flower Flower = new Flower();
				Flower.setUsid(id);     
				Flower.setName(result.getString("name"));
				entity = Optional.of(Flower);
			} else {
				entity = Optional.empty();
				}
			} catch (SQLException e) {
				logger.error("Error while trying to get entity by Id: " + e.getMessage());   
				}   
		return entity;  
	} 
	 
	@Override
	public List<Flower> getAll() {
		 List<Flower> FlowerList = new ArrayList<Flower>();
		 try (Connection conn = dataSource.getConnection();
				 PreparedStatement stmnt = conn       
						 .prepareStatement("SELECT \"flid\", \"name\" FROM \"javaCFMTA::Flower\"")) {
			 ResultSet result = stmnt.executeQuery();
			 while (result.next()) {
				 Flower Flower = new Flower();
				 Flower.setUsid(result.getLong("Flid"));
				 Flower.setName(result.getString("NAME"));
				 FlowerList.add(Flower);
				 }   
			 } catch (SQLException e) {
				 logger.error("Error while trying to get list of entities: " + e.getMessage());
			}   
		 return FlowerList;
	} 
	 
	@Override
	public void save(Flower entity) {
		 try (Connection conn = dataSource.getConnection();
				 PreparedStatement stmnt = conn.prepareStatement(
						 "INSERT INTO \"javaCFMTA::Flower\"(\"name\") VALUES (?)")) {
			 stmnt.setString(1, entity.getName());
			 stmnt.execute();
			 } catch (SQLException e) {
				 logger.error("Error while trying to add entity: " + e.getMessage());
				 }
	} 
	 
	@Override
	public void delete(Long id) {
		 try (Connection conn = dataSource.getConnection();
				 PreparedStatement stmnt = conn.prepareStatement("DELETE FROM \"javaCFMTA::Flower\" WHERE \"flid\" = ?")) {
			 stmnt.setLong(1, id);
			 stmnt.execute();
			 } catch (SQLException e) {
				 logger.error("Error while trying to delete entity: " + e.getMessage());
				 }
	}
	 
	@Override
	public void update(Flower entity) {
		 try(Connection conn = dataSource.getConnection();
				 PreparedStatement stmnt = conn.prepareStatement("UPDATE \"javaCFMTA::Flower\" SET \"name\" = ? WHERE \"flid\" = ?")) {
			 stmnt.setString(1, entity.getName());
			 stmnt.setLong(2, entity.getUsid());
			 stmnt.executeUpdate();
		 } catch (SQLException e) {
			 logger.error("Error while trying to update entity: " + e.getMessage());
		 }
	}
}
