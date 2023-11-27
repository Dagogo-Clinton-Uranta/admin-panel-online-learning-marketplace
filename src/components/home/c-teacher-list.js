import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { styled } from "@mui/styles";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { Link, NavLink, useNavigate} from "react-router-dom";
//import SearchBar from "material-ui-search-bar";
//import useRequest from "../../hooks/use-request";
import { fetchTeachers } from "../../redux/actions/job.action";
import Skeleton from '@mui/material/Skeleton';
import {Typography,CardMedia,} from '@material-ui/core';
//import CoolerBoxIMG from '../../assets/images/save-money.png';

import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';


import { useDispatch, useSelector } from "react-redux";

import { deleteSingleJob } from "../../redux/actions/job.action";
import {fetchTeacherInfo} from 'src/redux/actions/group.action'

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:'#000000'/* "#60A1EC"*/,
    color: theme.palette.common.white,
    width:150
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    width:150
  },
}));

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const originalJobList = [
  { id: 1, title: "Java Developer", fulldate: "01/01/2022" },
  { id: 2, title: "MERN Stack Developer", fulldate: "01/01/2022"},
  { id: 3, title: "Flutter Developer", fulldate: "01/01/2022"},
].sort((a, b) => (a.title < b.title ? -1 : 1));

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TeacherList({teachers}) {
  //search function
  const dispatch = useDispatch();
  const [teacherList, setTeacherList] = useState(teachers);
  console.log("all users are:",teachers)
  const [searched, setSearched] = useState("");
  const classes = useStyles();
  const requestSearch = (searchedVal) => {
    const filteredRows = teachers?.filter((row) => {
      return row.title.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setTeacherList(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  //search function end

  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [wait,setWait] =useState(false)

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - teacherList.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const viewTeachersFxn = (id) => {
   
    setWait(true)
    dispatch(fetchTeacherInfo(id))

   setTimeout(()=> {navigate('/dashboard/edit-teacher',{state:{uid:id}})}, 1500)
  };

  const deleteTeacherFxn = (id) => {
   const preserveId = id
    
  if(window.confirm("are you sure you want to delete this user?")){
   
    //dispatch(deleteSingleJob(id)); 
    
    notifySuccessFxn("Employee Successfully Deleted!");
    
   setTimeout(function(){window.location.reload()},3000);
     
  }
}
  

  // const { doRequest, loading } = useRequest({
  //   url: '/setup/update-field',
  //   method: 'post',
  //   onSuccess: (data) => {
  //     // console.log('data: ', data);
  //     setLoadingButton(false);
  //     if (data?.message === 'done') {
  //       navigate('profile-picture?job=' + jobID);
  //     } else {
  //       setErrorMessage(data?.message);
  //     }
  //   }
  // });



  return (
    <>
        {
          teachers ? 
          <>
       

         {/*<div style={{float: 'right', border: '0px solid red'}}>
        <Button
            type="submit"
           
            variant="contained"
            style={{
              backgroundColor: '#000000' ,
              color: "white",
              fontSize: "15px",
            }}
            sx={{ mt: 7, mb: 2 }}
             
            onClick={() => {console.log("this button is supposed to move you to an add user page")}}
          >
            ADD TEACHER
          </Button>
            


      </div>*/}
      
      <br/>
      <p style={{fontSize: '26px', marginLeft: '5px',marginBottom:"1rem", color: 'black',display:"flex",justifyContent:"space-between"}}><b>ALL TEACHERS</b>  
      
      
                <Button
                   
                   type="button"
                    // fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: '#000000' ,
                      color: "white",
                      width: "17%",

                      fontSize: "15px",
                    }}
                    sx={{ mt: 7, mb: 2 }}
                    onClick={() => {navigate('/dashboard/add-teacher')}}
                  >
                    ADD TEACHER
                  </Button>
                  
                  
                  </p>
                  <br/>
      <hr />
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 1500,tableLayout:"fixed" }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Level</StyledTableCell>
              <StyledTableCell align="right">Registered</StyledTableCell>
              
              {/*<StyledTableCell align="right">Industry</StyledTableCell>
              <StyledTableCell align="center">State</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>*/}
              <StyledTableCell align="right"></StyledTableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? teacherList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : teacherList
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.firstName + " " + row.lastName}
                </TableCell>
                <TableCell style={{ width: 140 }} align="right">
                  {row.level}
                </TableCell>
                {/*<TableCell style={{ width: 140 }} align="right">
                {row.accountCreated &&typeof(row.accountCreated) !== "string"  ?(new Date(row.accountCreated.seconds*1000)).toDateString():row.accountCreated}
                </TableCell>*/}
                
                <TableCell style={{ width: 140 }} align="right">
                {row.registeredOn &&typeof(row.registeredOn) !== "string"  ?(new Date(row.registeredOn.seconds*1000)).toDateString():row.accountCreated}
                </TableCell>

               

                <TableCell style={{ width: 180 }} align="right">
                  <Button
                    type="submit"
                    // fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: '#000000' /*"#60A1EC"*/,
                      color: "white",
                      width: "70%",
                      fontSize: "15px",
                    }}
                    sx={{ mt: 7, mb: 2 }}
                    onClick={() => viewTeachersFxn(row.uid.trim())}
                  >
                   VIEW
                  </Button>
                </TableCell>


                {/*<TableCell style={{ width: 180 }} align="right">
                  <Button
                    type="submit"
                    // fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: '#000000' ,
                      color: "white",
                      width: "70%",
                      fontSize: "15px",
                    }}
                    sx={{ mt: 7, mb: 2 }}
                    onClick={console.log("i am supposed to delete");() => deleteJobFxn(row.id)}
                  >
                    DELETE
                  </Button>
                </TableCell>*/}
              </TableRow>
            ))}

            {/*emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )*/}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={teacherList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
               ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
     
          </>
          :
          <center>
          <Box sx={{ width: 300 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
        </center>
        }

    </>
  );
}
