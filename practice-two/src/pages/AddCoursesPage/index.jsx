import Button from '@components/Button';
import Input from '@components/Input';
import { ERROR_MSG } from '@constants/messages';
import { useState } from 'react';

const AddCoursesPage = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    description: '',
    start_date: '',
    end_date: '',
    schedule: '',
    students: [],
  });

  // State to manage form errors
  const [formErrors, setFormErrors] = useState({
    name: '',
    subject: '',
    description: '',
    start_date: '',
    end_date: '',
    schedule: '',
    students: [],
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the corresponding error when the user starts typing in a field
    setFormErrors({
      ...formErrors,
      [name]: '',
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = 'This field is required.';
      }
    });

    if (Object.keys(errors).length > 0) {
      // Set errors and prevent form submission
      setFormErrors(errors);
    } else {
      // Form is valid, add logic to handle the form submission
      console.log('Form submitted:', formData);

      try {
        // Form is valid, add logic to handle the form submission
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/courses/add/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          // Course added successfully, you can redirect or perform other actions
          alert('Course added successfully!');
        } else {
          // Handle error response
          const data = await response.json();
          console.error('Error:', data);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <main className="flex w-full justify-center">
      <form className="z-50 grid grid-cols-1  p-16 " onSubmit={handleSubmit}>
        <h2 className="mb-10 text-3xl font-700 uppercase">
          New course information
        </h2>

        <label className="text-custom-dark-gray">Name </label>
        <Input
          autoFocus
          type="text"
          placeholder="Enter course name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {/* Error message */}
        {formErrors.name && (
          <p className="text-xs text-red-500" role="alert">
            {formErrors.name}
          </p>
        )}

        <label className="text-custom-dark-gray">Subject </label>
        <Input
          type="text"
          placeholder="Enter subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
        />
        {/* Error message */}
        {formErrors.subject && (
          <p className="text-xs text-red-500" role="alert">
            {formErrors.subject}
          </p>
        )}

        <label className="text-custom-dark-gray">Description </label>
        <Input
          type="text"
          placeholder="Enter description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {/* Error message */}
        {formErrors.description && (
          <p className="text-xs text-red-500" role="alert">
            {formErrors.description}
          </p>
        )}

        <label className="text-custom-dark-gray">Start date </label>
        <Input
          type="datetime-local"
          placeholder="Enter description"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
        />
        {/* Error message */}
        {formErrors.start_date && (
          <p className="text-xs text-red-500" role="alert">
            {formErrors.start_date}
          </p>
        )}

        <label className="text-custom-dark-gray">End date </label>
        <Input
          type="datetime-local"
          placeholder="Enter description"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
        />
        {/* Error message */}
        {formErrors.end_date && (
          <p className="text-xs text-red-500" role="alert">
            {formErrors.end_date}
          </p>
        )}

        <label className="text-custom-dark-gray">Schedule </label>
        <Input
          type="text"
          placeholder="Enter description"
          name="schedule"
          value={formData.schedule}
          onChange={handleChange}
        />
        {/* Error message */}
        {formErrors.schedule && (
          <p className="text-xs text-red-500" role="alert">
            {formErrors.schedule}
          </p>
        )}

        <Button
          primary
          className="text-md mt-10 w-1/2 justify-self-center uppercase"
          type="submit"
        >
          Add
        </Button>
      </form>
    </main>
  );
};

export default AddCoursesPage;
