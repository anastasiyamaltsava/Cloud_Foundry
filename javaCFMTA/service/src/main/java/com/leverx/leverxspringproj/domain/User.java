package com.leverx.leverxspringproj.domain;

public class User {
	
	private long usid;
	
	private String name;
	
	public String getName() {
		return name;
	}
	
	public long getUsid() {
		return usid;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public void setUsid(long usid) {
		this.usid = usid;
	}
	
}
