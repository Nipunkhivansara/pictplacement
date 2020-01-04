package com.example.demo.repository;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.model.placedstudents;

public interface placedstudentsrepo extends JpaRepository<placedstudents, Integer> {
	// for admin to see pending request
	/*
	 * @Modifying(clearAutomatically = true)
	 * 
	 * @Transactional
	 * 
	 * @Query(value =
	 * "select p.id,s.fn,c.name,p.package_lpa,p.location,p.pl_status from placedstudents as p,Studentpersonal_Details as s,industry as c where p.id = s.rollno "
	 * , nativeQuery = true) public List<AdminPlaced> pendingStudents();
	 */
	@Transactional
	@Query(value = "SELECT id FROM placedstudents WHERE comp_id = ? ", nativeQuery = true)
	public List<Integer> findByComp(int id);
	
	@Query(value="Select id from placedstudents where count in ?1",nativeQuery=true)
	public List<Integer> findByCount(List<Integer>counts);
	
	@Query(value = "SELECT id FROM placedstudents WHERE comp_id = ? and pl_status=0", nativeQuery = true)
	public List<Integer> findShortlisted(int id);
	

	@Query(value = "UPDATE placedstudents SET pl_status=1 WHERE id IN ?1 AND comp_id = ?2", nativeQuery = true)
	public void findByCompIdAndStudent(List<Integer> a, int cid);

	@Query(value = "SELECT * FROM placedstudents WHERE id = ?1", nativeQuery = true)
	public placedstudents findByStuId(int id);

	@Modifying
	@Transactional
	@Query(value = "DELETE FROM placedstudents WHERE id = ?1 AND pl_status <> 2", nativeQuery = true)
	public void deleteStuPlaced(int a);
	
	@Transactional
	@Modifying
	@Query(value = "update placedstudents set pl_status=2 where count IN ?1", nativeQuery = true)
	public void placeByAdmin(List<Integer>counts);
	
	@Query(value = "select id from placedstudents where pl_status=2 and comp_id=?1",nativeQuery=true)
	public List<Integer> findPlacedByCompany(int id);

	@Query(value="select * from placedstudents where pl_status=1 and id not in ?1",nativeQuery = true)
	public List<placedstudents>findAllExceptPlaced(List<Integer>ids);
	
	@Query(value="select * from placedstudents where pl_status=1",nativeQuery = true)
	public List<placedstudents>findPending();
}