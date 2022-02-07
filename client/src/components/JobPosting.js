import './JobPosting.css';

function JobPosting(props) {
  const { item } = props;

  return (
    <div className="jobposting">
      <div className="id">{item.id}</div>
      <div className="description">{item.description}</div>
      <div className="deadline">{item.deadline}</div>
    </div>
  );
}

export default JobPosting;
