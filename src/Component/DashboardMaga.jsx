import * as React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import UseStore from "../Store.js";
import Dialog from "@mui/material/Dialog";
import Sidebar from "./Sidebar.jsx";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const TableStudents = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("First Name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [selectedElement, setSelectedElement] = useState();

  const columnsMappingS = {
    Nom: "Nom",
    Prenom: "Prenom",
    NomUser: "Nom Utilisateur",
    Password: "Password",
  };

  let columnMapping = columnsMappingS;

  const searchQuery = UseStore((state) => state.searchQuery);
  const setSearchQuery = UseStore((state) => state.setSearchQuery);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterDataByQuery = (jsonData, searchQuery) => {
    return jsonData.filter((item) =>
      item.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const dataArticle = [
    {
      Nom: "kuider",
      Prenom: "aes",
      NomUser: "ddd",
      Password: "ddd",
    },
    {
      Nom: "kuider",
      Prenom: "aes",
      NomUser: "ddd",
      Password: "ddd",
    },
    {
      Nom: "kuider",
      Prenom: "aes",
      NomUser: "ddd",
      Password: "ddd",
    },
  ];
  let filteredData;

  if (searchQuery) {
    filteredData = filterDataByQuery(dataArticle, searchQuery);
    console.log(filteredData);
  } else {
    filteredData = dataArticle;
    console.log(filteredData);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  const ddt = stableSort(filteredData, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const colums = Object.keys(dataArticle[0]);

  const handelOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handelData = (e) => {
    e.preventDefault();
  };
  return (
    <div className="">
      <Sidebar />
      <h1 className="text-center font-bold mt-8 ml-20"> dashboard Article</h1>
      <div className="flex justify-end mr-4 ">
        <button
          className="text-white bg-black px-3 py-2  rounded-md"
          onClick={handelOpen}
        >
          Ajouter un Magasinier
        </button>
      </div>
      <div className="ml-[232px] mt-10 ">
        <Box sx={{ width: "100" }}>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <div className="py-8 px-16 ">
              <h1 className="text-center my-5 font-semibold text-lg">
                Ajouter un Magasinier
              </h1>
              <form className="flex flex-col justify-center gap-7">
                <input
                  className="border-none px-2 w-64  py-2 bg-gray-200 text-black rounded-md"
                  type="text"
                  placeholder="code"
                />
                <input
                  className="border-none px-2 w-64 py-2 bg-gray-200 text-black rounded-md"
                  type="text"
                  placeholder="Nom"
                />
                <input
                  className="border-none px-2 w-64 py-2 bg-gray-200 text-black rounded-md"
                  type="text"
                  placeholder="prenom"
                />
                <input
                  className="border-none px-2 w-64 py-2 bg-gray-200 text-black rounded-md"
                  type="text"
                  placeholder="Nom utilisateur"
                />
                <input
                  className="border-none px-2 w-64 py-2 bg-gray-200 text-black rounded-md"
                  type="text"
                  placeholder="Password"
                />
                <div className="flex justify-end ">
                  <button
                    onClick={handelData}
                    className="bg-black text-white rounded-lg px-5 py-2"
                  >
                    valider
                  </button>
                </div>
              </form>
            </div>
          </Dialog>
          <div className="flex rounded-full  border-border  w-max mx-4 my-3">
            {/* <AiOutlineSearch size={32} /> */}
            <input
              className="py-2 pl-2 pr-20 outline-none bg-gray-200 rounded-sm  border-border "
              type="text"
              placeholder="Search by First name"
              onChange={handleSearch}
              value={searchQuery}
            />
          </div>
          <Paper sx={{ width: "100%", mb: 2 }}>
            {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={dataArticle.length}
                  colums={colums}
                  columnMapping={columnMapping}
                />
                <TableBody sx={{ minWidth: 750 }}>
                  {ddt.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        key={index}
                        tabIndex={-1}
                        sx={{ cursor: "pointer", minWidth: 750 }}
                      >
                        {Object.keys(row).map((key) => (
                          <TableCell key={key}>
                            <h1 className="text-center font-itim font-medium  text-xs">
                              {row[key]}
                            </h1>
                          </TableCell>
                        ))}
                        <TableCell>
                          <h1 className=" text-white px-1  text-center font-itim font-medium  text-xs">
                            <span className="bg-red-500  text-[12px] px-1 py-1 rounded-md">
                              Supprimer
                            </span>
                          </h1>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30, 40]}
              component="div"
              count={dataArticle.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default TableStudents;

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, colums, columnMapping } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className=" bg-gray-100  text-gray-600  ">
        {colums.map((key) => (
          <TableCell key={key} sortDirection={orderBy === key ? order : false}>
            <div
              direction={orderBy === key ? order : "asc"}
              onClick={createSortHandler(key)}
              className="cursor-pointer text-gray-600  text-center"
            >
              {columnMapping[key]}
              {orderBy === key ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </div>
          </TableCell>
        ))}
        <TableCell>
          <h1 className="cursor-pointer text-gray-600  text-center">Actions</h1>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
