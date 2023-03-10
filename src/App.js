import './App.css';
import React, { useState, useRef, useEffect } from 'react'
import Select from 'react-select'

const version_name = 'Metric-Feb12'

const hostname = '45.76.11.163';
const port = 8000;

const cats = ['bottle', 'plate', 'bowl', 'cup', 'mug', 'can'];

const options = [
  { value: 'HandSmooth', label: 'HandSmooth' },
  { value: 'FrankMocap', label: 'FrankMocap' }, // Include HandOcclude

  { value: 'Poor-Obj-Rot', label: 'Poor-Obj-Rot' },
  { value: 'No-Contact', label: 'No-Contact' },
  { value: 'Intersect', label: 'Intersect' },

  { value: 'CAD', label: 'CAD' },
  { value: 'Success', label: 'Success' },

  { value: 'Unexplained', label: 'Unexplained' },
  { value: 'ObjMask', label: 'ObjMask' },
  { value: 'BadLabel', label: 'BadLabel' },
  { value: 'NotCheck', label: 'NotCheck' },
]

function DataRow(props) {
  const index = props.index;
  const loaded = props.loaded;
  const video = props.video;
  const comments = props.comments;
  const src = `./${version_name}/${props.video}`;

  let comp = null;
  if (!loaded) {
    comp = <label>Off-Line</label>
  } else {
    comp = <Select options={options}
      defaultValue={options.find(({ value }) => value === comments.current[video]['comment'])}
      onChange={(e) => {
        comments.current[video]['comment'] = e.value;
        fetch(`http://${hostname}:${port}/api/${version_name}/update_comment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            video: video,
            comment: comments.current[video]['comment'],
          }),
        }).then(resp => resp.json())
          .then(data => {
            ;
            // console.log(data);
          }
          );
      }}
    />
  }
  return <tr key={video}>
    <td>{index}</td>
    <td>{video}</td>
    <td>
      <video width={468} src={src.replace("_action", "_mask")} controls />
    </td>
    <td>
      <video width={468} src={src} controls />
    </td>
    <td>
      iou: {comments.current[video]['iou']}<br></br>
      collision: {comments.current[video]['collision']}<br></br>
      min_dist: {comments.current[video]['min_dist']}<br></br>
      {comp}
    </td>
  </tr>
}

function App() {
  const [curCat, setCurCat] = useState('bottle'); // TODO
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(200);
  const [totalPages, setTotalPages] = useState(0);

  const [loaded, setLoaded] = React.useState(false);
  let comments = useRef(null);

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (loaded) {
      return;
    }
    Promise.all([
      fetch(`http://${hostname}:${port}/api/${version_name}/get_all_comments`),
    ]).then(resp => Promise.all(resp.map(r => r.json())))
      .then(([df]) => {
        comments.current = df;
        setLoaded(true);
        setTotalPages(Math.ceil(Object.keys(comments.current).length / dataPerPage));
      });
  }, []);

  if (!loaded) {
    return <div>loading...</div>
  }

  let videos = Object.keys(comments.current);
  videos.sort();

  let rows = [];

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = videos.slice(indexOfFirstData, indexOfLastData);
  console.log(comments)

  let index = indexOfFirstData;
  for (const video of currentData) {
    index += 1;
    rows.push(<DataRow key={video} index={index} loaded={loaded} video={video} comments={comments} />)
  }
  return (
    <div>
      <table><tbody>{rows}</tbody></table>
      <button disabled={currentPage === 1} onClick={handlePrev}>
        Prev
      </button>
      <button disabled={currentPage === totalPages} onClick={handleNext}>
        Next
      </button>
    </div>
  )
}

export default App;