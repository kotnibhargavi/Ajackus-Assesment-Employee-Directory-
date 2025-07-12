import { useState, useMemo } from "react";
import { mockEmployees, departments, roles } from "../../shared/employee.js";

export default function Index() {
  const [employees, setEmployees] = useState(mockEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("--Select--");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    firstName: "",
    department: "",
    role: "",
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    role: "",
  });

  // Filter and search logic
  const filteredEmployees = useMemo(() => {
    let filtered = employees.filter((employee) => {
      const matchesSearch =
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        (!filters.firstName ||
          employee.firstName
            .toLowerCase()
            .includes(filters.firstName.toLowerCase())) &&
        (!filters.department ||
          filters.department === "all" ||
          employee.department === filters.department) &&
        (!filters.role ||
          filters.role === "all" ||
          employee.role === filters.role);

      return matchesSearch && matchesFilter;
    });

    // Apply sorting
    if (sortBy === "firstName") {
      filtered.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (sortBy === "department") {
      filtered.sort((a, b) => a.department.localeCompare(b.department));
    }

    return filtered;
  }, [employees, searchTerm, filters, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      department: employee.department,
      role: employee.role,
    });
    setShowAddModal(true);
  };

  const handleAdd = () => {
    setEditingEmployee(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      role: "",
    });
    setShowAddModal(true);
  };

  const handleSave = () => {
    if (editingEmployee) {
      // Update existing employee
      setEmployees(
        employees.map((emp) =>
          emp.id === editingEmployee.id ? { ...emp, ...formData } : emp,
        ),
      );
    } else {
      // Add new employee
      const newEmployee = {
        id: Math.max(...employees.map((e) => e.id)) + 1,
        ...formData,
      };
      setEmployees([...employees, newEmployee]);
    }
    setShowAddModal(false);
  };

  const applyFilters = () => {
    setCurrentPage(1);
    setShowFilter(false);
  };

  const resetFilters = () => {
    setFilters({ firstName: "", department: "", role: "" });
    setCurrentPage(1);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <h1 className="header-title">Employee Directory</h1>
          <div className="header-actions">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button
              className="filter-button"
              onClick={() => setShowFilter(!showFilter)}
            >
              Filter
            </button>
          </div>
        </div>
      </header>

      <div className="main-container">
        {/* Main Content */}
        <div className={`content-area ${showFilter ? "with-filter" : ""}`}>
          {/* Controls */}
          <div className="controls">
            <div className="controls-left">
              <div className="control-group">
                <span className="control-label">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="select sort-select"
                >
                  <option value="--Select--">--Select--</option>
                  <option value="firstName">First Name</option>
                  <option value="department">Department</option>
                </select>
              </div>
              <div className="control-group">
                <span className="control-label">Show:</span>
                <select
                  value={itemsPerPage.toString()}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="select"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
            <button onClick={handleAdd} className="add-button">
              Add Employee
            </button>
          </div>

          {/* Employee Grid */}
          <div className="employee-grid">
            {paginatedEmployees.map((employee) => (
              <div key={employee.id} className="employee-card">
                <h3 className="employee-name">
                  {employee.firstName} {employee.lastName}
                </h3>
                <div className="employee-details">
                  <div className="employee-detail">
                    <span className="detail-label">Email:</span>{" "}
                    {employee.email}
                  </div>
                  <div className="employee-detail">
                    <span className="detail-label">Department:</span>{" "}
                    {employee.department}
                  </div>
                  <div className="employee-detail">
                    <span className="detail-label">Role:</span> {employee.role}
                  </div>
                </div>
                <div className="employee-actions">
                  <button
                    className="action-button"
                    onClick={() => handleEdit(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-button"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              className="pagination-button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>

        {/* Filter Sidebar */}
        {showFilter && (
          <div className="filter-sidebar">
            <h3 className="filter-title">Filter Employees</h3>
            <div>
              <div className="filter-group">
                <label className="filter-label" htmlFor="filter-firstName">
                  First Name
                </label>
                <input
                  id="filter-firstName"
                  className="filter-input"
                  value={filters.firstName}
                  onChange={(e) =>
                    setFilters({ ...filters, firstName: e.target.value })
                  }
                />
              </div>
              <div className="filter-group">
                <label className="filter-label" htmlFor="filter-department">
                  Department
                </label>
                <select
                  id="filter-department"
                  className="filter-select"
                  value={filters.department}
                  onChange={(e) =>
                    setFilters({ ...filters, department: e.target.value })
                  }
                >
                  <option value="">Select department</option>
                  <option value="all">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label" htmlFor="filter-role">
                  Role
                </label>
                <select
                  id="filter-role"
                  className="filter-select"
                  value={filters.role}
                  onChange={(e) =>
                    setFilters({ ...filters, role: e.target.value })
                  }
                >
                  <option value="">Select role</option>
                  <option value="all">All Roles</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-actions">
                <button onClick={applyFilters} className="filter-apply">
                  Apply
                </button>
                <button onClick={resetFilters} className="filter-reset">
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">
          © 2025 Bhargavi Kotni. All rights reserved.
        </p>
      </footer>

      {/* Add/Edit Employee Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {editingEmployee ? "Edit Employee" : "Add Employee"}
            </h2>
            <div>
              <div className="form-group">
                <label className="form-label" htmlFor="firstName">
                  First name
                </label>
                <input
                  id="firstName"
                  className="form-input"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="lastName">
                  Last name
                </label>
                <input
                  id="lastName"
                  className="form-input"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
              <div className="form-group-row">
                <div>
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="department">
                    Department
                  </label>
                  <select
                    id="department"
                    className="form-select"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                  >
                    <option value="">Select department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="role">
                  Role
                </label>
                <select
                  id="role"
                  className="form-select"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="">Select role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button
                  className="modal-cancel"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button onClick={handleSave} className="modal-save">
                  {editingEmployee ? "Save" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
