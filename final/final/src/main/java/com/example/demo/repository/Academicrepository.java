package com.example.demo.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.type.TrueFalseType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.demo.model.users;
import com.example.demo.model.Academicdetails;

public interface Academicrepository extends JpaRepository<Academicdetails, Integer> {

	@Modifying(clearAutomatically = true)
	@Transactional
	@Query(value = "select * from student", nativeQuery = true)
	public users addToTable(@Param("columnName") String columnName, @Param("dataType") String dataType);

	@Query(value = "select * from academic_details where br IN ?1", nativeQuery = true)
	public List<Academicdetails> sortbybranch(List<String> branches);

	@Query(value = "select skills from industry_skills where industry_id=?1", nativeQuery = true)
	public List<String> sortbyskills(int id);

	@Query(value = "select college_id from academic_details ", nativeQuery = true)
	public List<Integer> findid();

	@Query(value = "select skills from academicdetails_skills where academicdetails_college_id=?1", nativeQuery = true)
	public List<String> getskills(int id);

	@Modifying
	@Transactional
	@Query(value = "update academic_details set placed=" + "true" + " where college_id IN ?1", nativeQuery = true)
	public void finalplaced(List<Integer> id);

	@Query(value = "SELECT * FROM academic_details WHERE college_id NOT IN ?1 AND placed = false", nativeQuery = true)
	public List<Academicdetails> findExceptTheseStu(List<Integer> id);

	@Query(value = "SELECT * FROM academic_details WHERE placed = false", nativeQuery = true)
	public List<Academicdetails> findNotPlaced();
	
	@Query(value = "SELECT college_id FROM academic_details WHERE placed = true", nativeQuery = true)
	public List<Integer> findPlacedIds();

	@Query(value = "SELECT * FROM academic_details  WHERE college_id IN ?1", nativeQuery = true)
	public List<Academicdetails> findTheseStu(List<Integer> id);

	@Query(value = "SELECT * FROM academic_details as ad WHERE ad.college_id  IN ?1  AND ad.placed = false AND ad.college_id IN (SELECT ps.id FROM placedstudents as ps WHERE ps.pl_status=1 AND ps.comp_id=?2)", nativeQuery = true)
	public List<Academicdetails> findPlacedByComp(List<Integer> id, int cid);
	
	@Query(value = "SELECT * FROM academic_details as ad WHERE ad.college_id  IN ?1  AND ad.placed = true AND ad.college_id IN (SELECT ps.id FROM placedstudents as ps WHERE ps.pl_status=2 AND ps.comp_id=?2)", nativeQuery = true)
	public List<Academicdetails> findFinalPlacedByComp(List<Integer> id, int cid);
	
	@Transactional
	@Modifying
	@Query(value = "update academic_details set placed=true where college_id in ?1",nativeQuery=true)
	public void place(List<Integer>id);
}
