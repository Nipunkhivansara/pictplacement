package com.example.demo.daoimplmentation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;

import com.example.demo.model.AdminPlaced;
import com.example.demo.model.countofplaced;
//-------------CLASS FOR WRITING SQL QUERIES IN JDBC---------------------
@Repository
public class CustomerDaoImpl extends JdbcDaoSupport implements CustomerDao{
 
    @Autowired 
    DataSource dataSource;
 
    @PostConstruct
    private void initialize(){
        setDataSource(dataSource);
    }
    //...
/*
    @Override
    public void insert(Customer cus) {
        String sql = "INSERT INTO customer " +
    "(CUST_ID, NAME, AGE) VALUES (?, ?, ?)" ;
        getJdbcTemplate().update(sql, new Object[]{
        cus.getCustId(), cus.getName(), cus.getAge()
    });
    }

    @Override
    public void inserBatch(List<Customer> customers) {
      String sql = "INSERT INTO customer " + "(CUST_ID, NAME, AGE) VALUES (?, ?, ?)";
      getJdbcTemplate().batchUpdate(sql, new BatchPreparedStatementSetter() {
        public void setValues(PreparedStatement ps, int i) throws SQLException {
          Customer customer = customers.get(i);
          ps.setLong(1, customer.getCustId());
          ps.setString(2, customer.getName());
          ps.setInt(3, customer.getAge());
        }
        
        public int getBatchSize() {
          return customers.size();
        }
      });
   
    }
*/
	@Override
	 public List<countofplaced> countofstudents(){
	    String sql = "SElect count(id),indname from placedstudents group by indname";
	    List<Map<String, Object>> rows = getJdbcTemplate().queryForList(sql);
	    
	    List<countofplaced> result = new ArrayList<countofplaced>();
	    for(Map<String, Object> row:rows){
	      countofplaced cus = new countofplaced();
	      cus.setCount((Long)row.get("count"));
	      cus.setName((String)row.get("indname"));
		    System.out.println(cus.getCount()+" name "+cus.getName());

	      result.add(cus);
	    }
	    return result;
	  }
	 @Override
	 public List<AdminPlaced> adminplaced(){
	    String sql = "select p.id as pid,concat(s.fn,' ',s.ln) as sfn,c.name as cname,p.package_lpa as pack,p.location as loc,p.pl_status as status from placedstudents as p,Studentpersonal_Details as s,industry as c where p.id = s.rollno AND c.id = p.comp_id AND p.pl_status='false'";
	    List<Map<String, Object>> rows = getJdbcTemplate().queryForList(sql);
	    
	    List<AdminPlaced> result = new ArrayList<AdminPlaced>();
	    for(Map<String, Object> row:rows){
	      AdminPlaced cus = new AdminPlaced();
	      cus.setRoll((int)row.get("pid"));
	      System.out.print(cus.getRoll());
	      cus.setStu_name((String)row.get("sfn"));
	      cus.setComp_name((String)row.get("cname"));
	      cus.setPackage_lpa((int)row.get("pack"));
	      cus.setLocation((String)row.get("loc"));
	      cus.setStatus((Boolean)row.get("status"));
	     

	      result.add(cus);
	    }
	    return result;
	  }
/*
	@Override
	  public Customer findCustomerById(long cust_id) {
	    String sql = "SELECT * FROM customer WHERE CUST_ID = ? ";
	    return (Customer)getJdbcTemplate().queryForObject(sql, new Object[]{cust_id}, new RowMapper<Customer>(){
	      @Override
	      public Customer mapRow(ResultSet rs, int rwNumber) throws SQLException {
	        Customer cust = new Customer();
	        cust.setCustId(rs.getLong("cust_id"));
	        cust.setName(rs.getString("name"));
	        cust.setAge(rs.getInt("age"));
	        return cust;
	      }
	    });
	  }
	@Override
	 public String findNameById(long cust_id) {
	     String sql = "SELECT name FROM customer WHERE cust_id = ?";
	     return getJdbcTemplate().queryForObject(sql, new Object[]{cust_id}, String.class);
	 }*/
	@Override
	 public int getTotalNumberCustomer() {
	     String sql = "SELECT Count(*) FROM log";
	     int total = getJdbcTemplate().queryForObject(sql, Integer.class);
	     return total;
	 }
}