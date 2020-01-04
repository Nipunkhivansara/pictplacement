package com.example.demo.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "placedstudents")
public class placedstudents {

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
	private users user;

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public users getUser() {
		return user;
	}

	public void setUser(users user) {
		this.user = user;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getCompId() {
		return compId;
	}

	public void setCompId(int compId) {
		this.compId = compId;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int count;

	int id;
	int compId;
	float package_lpa;
	String idname;

	public String getIdname() {
		return idname;
	}

	public void setIdname(String idname) {
		this.idname = idname;
	}

	String location;

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public float getPackage_lpa() {
		return package_lpa;
	}

	public int getPL_status() {
		return PL_status;
	}

	public void setPL_status(int pL_status) {
		PL_status = pL_status;
	}

	public void setPackage_lpa(float f) {
		this.package_lpa = f;
	}

	

	@Column(columnDefinition = "int default '0'")
	private int PL_status;

}
