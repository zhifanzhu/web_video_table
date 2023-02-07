import './App.css';
import React, { useState, useRef, useEffect } from 'react'
import Select from 'react-select'

const version_name = 'Feb03-sweep'

const hostname = '45.76.11.163';
const port = 8000;

const options = [
  { value: 'HandSmooth', label: 'HandSmooth' },
  { value: 'FrankMocap', label: 'FrankMocap' }, // Include HandOcclude

  { value: 'Poor-Obj-Rot', label: 'Poor-Obj-Rot' },
  { value: 'Poor-Physical', label: 'Poor-No-Contact' },
  { value: 'Unexplained', label: 'Unexplained' },

  { value: 'ObjMask', label: 'ObjMask' },
  { value: 'CAD', label: 'CAD' },
  { value: 'BadLabel', label: 'BadLabel' },
  { value: 'Success', label: 'Success' },

  { value: 'Unfinished', label: 'NotCheck' },
]

function DataRow(props) {
  const index = props.index;
  const loaded = props.loaded;
  const video = props.video;
  const comments = props.comments;
  const src = `./${version_name}/${props.video}`;
  console.log(src)
  let comp = null;
  if (!loaded) {
    comp = <label>Off-Line</label>
  } else {
    comp = <Select options={options}
      defaultValue={options.find(({ value }) => value === comments.current[video])}
      onChange={(e) => {
        comments.current[video] = e.value;
        // console.log(comments.current[video]);
        fetch(`http://${hostname}:${port}/api/${version_name}/update_comment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            video: video,
            comment: comments.current[video],
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
      {/* <img src={src.replace("_action.mp4", "_input.png")} width={512}/> */}
      <video width={468} src={src.replace("_action", "_mask")} controls />
    </td>
    <td>
      <video width={468} src={src} controls />
    </td>
    <td>{comp}</td>
  </tr>
}

function App() {
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