import { Dispatch, SetStateAction } from 'react';
import { TSCourse } from 'src/types/index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CourseForm: React.FC<any> = (props: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  courseDetail: TSCourse;
}) => {
  const { isOpen, setIsOpen, courseDetail } = props;
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center">
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={() => {
            setIsOpen(false);
          }}
        ></div>
        <div className="z-50 grid w-full max-w-2xl grid-cols-1 rounded-2xl bg-white p-16 shadow-lg">
          <h2 className="mb-10 text-center text-3xl font-700 uppercase">
            Course
          </h2>
          <div className="row-auto flex justify-between">
            <div className="flex flex-col">
              <p className="text-xl font-500">Calendar:</p>
              <p className="row-auto flex  gap-3 text-xl font-500">
                Time:
                <p className="self-center text-lg font-500">
                  {courseDetail.timeStart} - {courseDetail.timeEnd}
                </p>
              </p>
            </div>
            <div>
              <p className="text-xl font-500">
                Total Students: {courseDetail.numberStudents}
              </p>
              <p className="text-xl font-500">Description:</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CourseForm;
