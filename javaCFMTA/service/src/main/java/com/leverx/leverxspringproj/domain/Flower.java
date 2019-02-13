package com.leverx.leverxspringproj.domain;

public class Flower {
	
	private long flid;
	
	private String name;
	
	public String getName() {
		return name;
	}
	
	public long getUsid() {
		return flid;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public void setUsid(long usid) {
		this.flid = usid;
	}
	
}
