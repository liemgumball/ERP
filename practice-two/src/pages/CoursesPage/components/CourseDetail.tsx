import Button from '@components/Button';
import Input from '@components/Input';
import { NOTIFIES_MSG } from '@constants/messages';
import useAuth from '@hooks/useAuth';
import { formatDate } from '@services/format';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { TCourse } from 'src/types';

const CourseDetail = () => {
  const data = useLoaderData() as TCourse;
  const { auth } = useAuth();

  const [formData, setFormData] = useState({
    amount: '',
    start_date: '',
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/courses/${data.id}/auto-create-payment/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert('Payments created successfully.');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to create payments.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <article className="min-w-min p-5">
      <header className="flex justify-between px-5 py-3">
        <h1 className="text-4xl font-700">{data.name}</h1>
        <Button
          primary
          onClick={() => alert(NOTIFIES_MSG.FUTURE_FEATURE)}
          disabled={auth?.user.role !== 'admin'}
        >
          Edit course details
        </Button>
      </header>
      <hr />
      <div className="flex flex-col gap-7 px-3 py-5">
        <div className="flex justify-center rounded-lg border bg-black p-5">
          <iframe
            width="1200"
            height="600"
            loading="lazy"
            src={`https://www.youtube.com/embed/${
              data.video ? data.video : 'kAM1PulT0Ns'
            }`}
          ></iframe>
        </div>
        <p className="text-xl font-700">
          Calendar:{' '}
          <span className="text-lg normal-case">
            Every week at {data.schedule}
          </span>
        </p>
        <p className="text-xl font-700">
          Subject: <span className="text-lg">{data.subject.name}</span>
        </p>
        <p className="text-xl font-700">
          Time:{' '}
          <span className="text-lg">
            {formatDate(data.start_date)} - {formatDate(data.end_date)}
          </span>
        </p>
        <p className="text-xl font-700">
          Total Students:{' '}
          <span className="self-center text-lg">{data.students.length}</span>
        </p>
        <p className="text-xl font-700">
          Students:{' '}
          {data.students.map((student) => (
            <span className="self-center text-lg">{student.name}</span>
          ))}
        </p>
        <p className="text-xl font-700">Description:</p>
        <p className="rounded-lg border p-3 normal-case text-gray-500">
          {data.description || 'No description'}
        </p>
        <p className="text-xl font-700">Auto add payment:</p>
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <Input
            name="amount"
            type="text"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
          />
          <Input
            name="start_date"
            type="datetime-local"
            value={formData.start_date}
            onChange={handleChange}
          />
          <Button primary type="submit" disabled={auth?.user.role !== 'admin'}>
            Auto add payments
          </Button>
        </form>
      </div>
    </article>
  );
};

export default CourseDetail;
