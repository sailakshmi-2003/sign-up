import { useEffect } from 'react';
import styles from '../styles/signup.module.css'; // Adjust the import path as needed

const SignUp = () => {
  useEffect(() => {
    const daysInMonth = (month, year) => new Date(year, month, 0).getDate();
    
    const daySelect = document.getElementById('dob-day');
    const monthSelect = document.getElementById('dob-month');
    const yearSelect = document.getElementById('dob-year');
    
    const populateDays = (days) => {
      daySelect.innerHTML = '';
      for (let i = 1; i <= days; i++) {
        const option = document.createElement('option');
        option.value = i.toString();
        option.textContent = i.toString();
        daySelect.appendChild(option);
      }
    };

    const populateYears = () => {
      const currentYear = new Date().getFullYear();
      for (let i = currentYear; i >= 1900; i--) {
        const option = document.createElement('option');
        option.value = i.toString();
        option.textContent = i.toString();
        yearSelect.appendChild(option);
      }
    };

    const updateDays = () => {
      const month = parseInt(monthSelect.value);
      const year = parseInt(yearSelect.value);
      const days = daysInMonth(month, year);
      populateDays(days);
    };

    if (monthSelect && yearSelect) {
      monthSelect.addEventListener('change', updateDays);
      yearSelect.addEventListener('change', updateDays);
      
      // Initial population of days and years
      populateYears();
      updateDays();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    // Retrieve form input values
    const firstName = e.target.elements.firstName.value;
    const surname = e.target.elements.surname.value;
    const emailOrMobile = e.target.elements.emailOrMobile.value;
    const password = e.target.elements.password.value;
    const dobDay = e.target.elements['dob-day'].value;
    const dobMonth = e.target.elements['dob-month'].value;
    const dobYear = e.target.elements['dob-year'].value;
    const gender = e.target.elements.gender.value;

    // Email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Mobile number validation regex pattern
    const mobileRegex = /^[0-9]{10,15}$/;

    // Password validation regex patterns
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    // Validation checks
    if (!firstName || !surname || !emailOrMobile || !password || !dobDay || !dobMonth || !dobYear || !gender) {
      alert('Please fill in all fields.');
      return;
    }

    if (!emailRegex.test(emailOrMobile) && !mobileRegex.test(emailOrMobile)) {
      alert('Please enter a valid email address or mobile number.');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    if (!hasUpperCase.test(password)) {
      alert('Password must contain at least one uppercase letter.');
      return;
    }

    if (!hasLowerCase.test(password)) {
      alert('Password must contain at least one lowercase letter.');
      return;
    }

    if (!hasNumber.test(password)) {
      alert('Password must contain at least one number.');
      return;
    }

    if (password.includes(' ')) {
      alert('Password cannot contain spaces.');
      return;
    }

    // If your specific requirements allow special characters, you can remove this check
    if (!hasSpecialChar.test(password)) {
      alert('Password must contain at least one special character.');
      return;
    }

    // If all validations pass, log input values to console
    console.log('First Name:', firstName);
    console.log('Surname:', surname);
    console.log('Email or Mobile:', emailOrMobile);
    console.log('Password:', password);
    console.log('Date of Birth:', `${dobDay}-${dobMonth}-${dobYear}`);
    console.log('Gender:', gender);
    
    console.log('Form submitted successfully!');
    // Here you can add further logic to handle form submission, e.g., sending data to backend
    
    // Reset the form fields after submission if needed
    e.target.reset();
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupHeader}>
        <h1>Sign Up</h1>
        <p>It's quick and easy.</p>
      </div>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <span className={styles.closeBtn}>&times;</span>
        <div className={styles.nameInputs}>
          <input type="text" name="firstName" placeholder="First name" required />
          <input type="text" name="surname" placeholder="Surname" required />
        </div>
        <input type="text" name="emailOrMobile" placeholder="Mobile number or email address" required />
        <input type="password" name="password" placeholder="New password" required />
        
        <div className={styles.dobSection}>
          <label htmlFor="dob">Date of birth <span className={styles.questionMark}>?</span></label>
          <div className={styles.dobInputs}>
            <select id="dob-day" name="dob-day" required>
              {/* Days will be populated by JavaScript */}
            </select>
            <select id="dob-month" name="dob-month" required>
              <option value="1">Jan</option>
              <option value="2">Feb</option>
              <option value="3">Mar</option>
              <option value="4">Apr</option>
              <option value="5">May</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Aug</option>
              <option value="9">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
            <select id="dob-year" name="dob-year" required>
              {/* Years will be populated by JavaScript */}
            </select>
          </div>
        </div>
        <div className={styles.genderSection}>
          <label>Gender <span className={styles.questionMark}>?</span></label>
          <div className={styles.genderInputs}>
            <label><input type="radio" name="gender" value="female" required /> Female</label>
            <label><input type="radio" name="gender" value="male" required /> Male</label>
            <label><input type="radio" name="gender" value="custom" required /> Custom</label>
          </div>
        </div>
        
        <p className={styles.infoText}>
          People who use our service may have uploaded your contact information to Facebook. <a href="#">Learn more.</a>
        </p>
        <p className={styles.terms}>
          By clicking Sign Up, you agree to our <a href="#">Terms</a>, <a href="#">Privacy Policy</a> and <a href="#">Cookies Policy</a>. You may receive SMS notifications from us and can opt out at any time.
        </p>
        
        <button type="submit" className={styles.signupButton}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
