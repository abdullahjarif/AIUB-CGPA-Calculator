// Grading systems
const gradingSystems = {
  v1: {
    name: "Current System (Post Fall 2016-2017)",
    grades: [
      { range: "90-100", letter: "A+", point: 4.00 },
      { range: "85-<90", letter: "A", point: 3.75 },
      { range: "80-<85", letter: "B+", point: 3.50 },
      { range: "75-<80", letter: "B", point: 3.25 },
      { range: "70-<75", letter: "C+", point: 3.00 },
      { range: "65-<70", letter: "C", point: 2.75 },
      { range: "60-<65", letter: "D+", point: 2.50 },
      { range: "50-<60", letter: "D", point: 2.25 },
      { range: "<50", letter: "F", point: 0.00 }
    ]
  },
  v2: {
    name: "Old System (Up to Fall 2016-2017)",
    grades: [
      { range: "94-100", letter: "A+", point: 4.00 },
      { range: "90-93.99", letter: "A", point: 3.75 },
      { range: "86-89.99", letter: "A-", point: 3.50 },
      { range: "82-85.99", letter: "B+", point: 3.25 },
      { range: "78-81.99", letter: "B", point: 3.00 },
      { range: "74-77.99", letter: "B-", point: 2.75 },
      { range: "70-73.99", letter: "C+", point: 2.50 },
      { range: "66-69.99", letter: "C", point: 2.25 },
      { range: "62-65.99", letter: "C-", point: 2.00 },
      { range: "58-61.99", letter: "D+", point: 1.75 },
      { range: "54-57.99", letter: "D", point: 1.50 },
      { range: "50-53.99", letter: "D-", point: 1.00 },
      { range: "<50", letter: "F", point: 0.00 }
    ]
  }
};

// Application state
let courses = [];
let currentGradingSystem = 'v1';

// DOM elements
const gradingSystemRadios = document.querySelectorAll('input[name="gradingSystem"]');
const gradeScaleDiv = document.getElementById('gradeScale');
const courseNameInput = document.getElementById('courseName');
const courseCreditsInput = document.getElementById('courseCredits');
const courseMarksInput = document.getElementById('courseMarks');
const addCourseBtn = document.getElementById('addCourse');
const coursesListDiv = document.getElementById('coursesList');
const cgpaResultDiv = document.getElementById('cgpaResult');
const totalCreditsDiv = document.getElementById('totalCredits');
const totalCoursesDiv = document.getElementById('totalCourses');
const overallGradeDiv = document.getElementById('overallGrade');
const clearAllBtn = document.getElementById('clearAll');
const exportResultsBtn = document.getElementById('exportResults');

// Initialize application
function init() {
  updateGradeScale();
  updateResults();
  bindEventListeners();
}

// Event listeners
function bindEventListeners() {
  gradingSystemRadios.forEach(radio => {
    radio.addEventListener('change', handleGradingSystemChange);
  });
  
  addCourseBtn.addEventListener('click', addCourse);
  clearAllBtn.addEventListener('click', clearAllCourses);
  exportResultsBtn.addEventListener('click', exportResults);
  
  // Enter key support for form
  [courseNameInput, courseCreditsInput, courseMarksInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addCourse();
      }
    });
  });
}

// Handle grading system change
function handleGradingSystemChange(e) {
  currentGradingSystem = e.target.value;
  updateGradeScale();
  updateResults();
}

// Update grade scale display
function updateGradeScale() {
  const system = gradingSystems[currentGradingSystem];
  gradeScaleDiv.innerHTML = '';
  
  system.grades.forEach(grade => {
    const gradeItem = document.createElement('div');
    gradeItem.className = 'grade-item';
    gradeItem.innerHTML = `
      <span class="grade-range">${grade.range}%</span>
      <span class="grade-letter">${grade.letter}</span>
      <span class="grade-point">${grade.point.toFixed(2)}</span>
    `;
    gradeScaleDiv.appendChild(gradeItem);
  });
}

// Get grade information from marks
function getGradeFromMarks(marks) {
  const system = gradingSystems[currentGradingSystem];
  
  for (const grade of system.grades) {
    if (grade.range === '<50' && marks < 50) {
      return grade;
    } else if (grade.range === '50-<60' && marks >= 50 && marks < 60) {
      return grade;
    } else if (grade.range === '60-<65' && marks >= 60 && marks < 65) {
      return grade;
    } else if (grade.range === '65-<70' && marks >= 65 && marks < 70) {
      return grade;
    } else if (grade.range === '70-<75' && marks >= 70 && marks < 75) {
      return grade;
    } else if (grade.range === '75-<80' && marks >= 75 && marks < 80) {
      return grade;
    } else if (grade.range === '80-<85' && marks >= 80 && marks < 85) {
      return grade;
    } else if (grade.range === '85-<90' && marks >= 85 && marks < 90) {
      return grade;
    } else if (grade.range === '90-100' && marks >= 90 && marks <= 100) {
      return grade;
    }
    
    // V2 system specific ranges
    if (currentGradingSystem === 'v2') {
      if (grade.range === '50-53.99' && marks >= 50 && marks <= 53.99) {
        return grade;
      } else if (grade.range === '54-57.99' && marks >= 54 && marks <= 57.99) {
        return grade;
      } else if (grade.range === '58-61.99' && marks >= 58 && marks <= 61.99) {
        return grade;
      } else if (grade.range === '62-65.99' && marks >= 62 && marks <= 65.99) {
        return grade;
      } else if (grade.range === '66-69.99' && marks >= 66 && marks <= 69.99) {
        return grade;
      } else if (grade.range === '70-73.99' && marks >= 70 && marks <= 73.99) {
        return grade;
      } else if (grade.range === '74-77.99' && marks >= 74 && marks <= 77.99) {
        return grade;
      } else if (grade.range === '78-81.99' && marks >= 78 && marks <= 81.99) {
        return grade;
      } else if (grade.range === '82-85.99' && marks >= 82 && marks <= 85.99) {
        return grade;
      } else if (grade.range === '86-89.99' && marks >= 86 && marks <= 89.99) {
        return grade;
      } else if (grade.range === '90-93.99' && marks >= 90 && marks <= 93.99) {
        return grade;
      } else if (grade.range === '94-100' && marks >= 94 && marks <= 100) {
        return grade;
      }
    }
  }
  
  return system.grades[system.grades.length - 1]; // Default to F
}

// Validate course input
function validateCourseInput() {
  const name = courseNameInput.value.trim();
  const credits = parseFloat(courseCreditsInput.value);
  const marks = parseFloat(courseMarksInput.value);
  
  if (!name) {
    showError('Course name is required');
    return false;
  }
  
  if (isNaN(credits) || credits <= 0) {
    showError('Credits must be a positive number');
    return false;
  }
  
  if (isNaN(marks) || marks < 0 || marks > 100) {
    showError('Marks must be between 0 and 100');
    return false;
  }
  
  return true;
}

// Add course
function addCourse() {
  if (!validateCourseInput()) return;
  
  const name = courseNameInput.value.trim();
  const credits = parseFloat(courseCreditsInput.value);
  const marks = parseFloat(courseMarksInput.value);
  const grade = getGradeFromMarks(marks);
  
  const course = {
    id: Date.now(),
    name,
    credits,
    marks,
    grade: grade.letter,
    points: grade.point
  };
  
  courses.push(course);
  clearForm();
  updateCoursesList();
  updateResults();
  showSuccess('Course added successfully');
}

// Clear form
function clearForm() {
  courseNameInput.value = '';
  courseCreditsInput.value = '';
  courseMarksInput.value = '';
  clearMessages();
}

// Remove course
function removeCourse(courseId) {
  courses = courses.filter(course => course.id !== courseId);
  updateCoursesList();
  updateResults();
  showSuccess('Course removed successfully');
}

// Update courses list display
function updateCoursesList() {
  if (courses.length === 0) {
    coursesListDiv.innerHTML = '<div class="empty-state">No courses added yet. Add your first course above.</div>';
    return;
  }
  
  coursesListDiv.innerHTML = courses.map(course => `
    <div class="course-item">
      <div class="course-name">${course.name}</div>
      <div class="course-credits">${course.credits} credits</div>
      <div class="course-marks">${course.marks.toFixed(2)}%</div>
      <div class="course-grade">${course.grade}</div>
      <div class="course-points">${course.points.toFixed(2)}</div>
      <button class="btn btn-danger" onclick="removeCourse(${course.id})">Remove</button>
    </div>
  `).join('');
}

// Calculate CGPA
function calculateCGPA() {
  if (courses.length === 0) return 0;
  
  const totalWeightedPoints = courses.reduce((sum, course) => {
    return sum + (course.points * course.credits);
  }, 0);
  
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  
  return totalCredits > 0 ? totalWeightedPoints / totalCredits : 0;
}

// Get overall grade from CGPA
function getOverallGrade(cgpa) {
  const system = gradingSystems[currentGradingSystem];
  
  for (const grade of system.grades) {
    if (cgpa >= grade.point) {
      return grade.letter;
    }
  }
  
  return 'F';
}

// Update results display
function updateResults() {
  const cgpa = calculateCGPA();
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  const totalCourses = courses.length;
  const overallGrade = cgpa > 0 ? getOverallGrade(cgpa) : '-';
  
  cgpaResultDiv.textContent = cgpa.toFixed(2);
  totalCreditsDiv.textContent = totalCredits.toFixed(1);
  totalCoursesDiv.textContent = totalCourses;
  overallGradeDiv.textContent = overallGrade;
}

// Clear all courses
function clearAllCourses() {
  if (courses.length === 0) return;
  
  if (confirm('Are you sure you want to clear all courses? This action cannot be undone.')) {
    courses = [];
    updateCoursesList();
    updateResults();
    showSuccess('All courses cleared successfully');
  }
}

// Export results
function exportResults() {
  if (courses.length === 0) {
    showError('No courses to export');
    return;
  }
  
  const cgpa = calculateCGPA();
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  const overallGrade = getOverallGrade(cgpa);
  const systemName = gradingSystems[currentGradingSystem].name;
  
  let exportText = `CGPA CALCULATION REPORT\n`;
  exportText += `========================\n\n`;
  exportText += `Grading System: ${systemName}\n`;
  exportText += `Date: ${new Date().toLocaleDateString()}\n\n`;
  exportText += `SUMMARY\n`;
  exportText += `-------\n`;
  exportText += `CGPA: ${cgpa.toFixed(2)}\n`;
  exportText += `Total Credits: ${totalCredits.toFixed(1)}\n`;
  exportText += `Total Courses: ${courses.length}\n`;
  exportText += `Overall Grade: ${overallGrade}\n\n`;
  exportText += `COURSE DETAILS\n`;
  exportText += `--------------\n`;
  
  courses.forEach((course, index) => {
    exportText += `${index + 1}. ${course.name}\n`;
    exportText += `   Credits: ${course.credits}, Marks: ${course.marks.toFixed(2)}%, Grade: ${course.grade}, Points: ${course.points.toFixed(2)}\n\n`;
  });
  
  // Create and download file
  const blob = new Blob([exportText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cgpa-report-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showSuccess('Results exported successfully');
}

// Show error message
function showError(message) {
  clearMessages();
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  addCourseBtn.parentNode.appendChild(errorDiv);
  setTimeout(clearMessages, 5000);
}

// Show success message
function showSuccess(message) {
  clearMessages();
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.textContent = message;
  addCourseBtn.parentNode.appendChild(successDiv);
  setTimeout(clearMessages, 3000);
}

// Clear messages
function clearMessages() {
  const messages = document.querySelectorAll('.error-message, .success-message');
  messages.forEach(msg => msg.remove());
}

// Make removeCourse globally available
window.removeCourse = removeCourse;

// Initialize the application
init();
