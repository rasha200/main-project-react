import Teachers from "./Teachers";

export default function Team() {
  const teachers = [
    { courseName: "Math", teacherName: "Alex Doe"},
    { courseName: "History", teacherName: "John Baldwin"},
    { courseName: "Physics", teacherName: "Lara Ted"},
    { courseName: "Geology", teacherName: "Adam Pert"}
  ];
  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="section-title text-center position-relative mb-5">
          <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
            Instructors
          </h6>
          <h1 className="display-4">Meet Our Instructors</h1>
        </div>
        <Teachers teachers={teachers}/>
      </div>
    </div>
  );
}
