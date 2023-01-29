import './App.css';
import React, { useRef, useEffect } from 'react'
import Select from 'react-select'
import local_data from './comments.json';

const options = [
  { value: 'Unfinished', label: 'NotCheck' },
  { value: 'Success', label: 'Success' },
  { value: 'FrankMocap', label: 'FrankMocap' },
  { value: 'ObjMask', label: 'ObjMask' },
  { value: 'CAD', label: 'CAD' },
  { value: 'BadLabel', label: 'BadLabel' },
  { value: 'Unexplained', label: 'Unexplained' },
]

function App(props) {
  const [videos, setVideos] = React.useState(null);
  const [loaded, setLoaded] = React.useState(false);
  const [onlines, setOnlines] = React.useState(false);
  let comments = useRef(null);
  useEffect(() => {
    if (loaded) {
      return;
    }
    setVideos(Object.keys(local_data));
    comments.current = local_data;
    setLoaded(true);
    // fetch('./comments.json', {
    //   method: 'GET',
    //   mode: 'no-cors',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   }
    // }).then(resp => resp.json())
    //   .then(data => {
    //     comments.current = data;
    //     setVideos(Object.keys(data));
    //     setLoaded(true);
    //     setOnlines(false);
    //   }).catch((e) => {
    //     console.log(e);
    //     console.log('Use server version');
    //     Promise.all([
    //       fetch("http://localhost:10100/api/video_list"),
    //       fetch("http://localhost:10100/api/get_all_comments"),
    //     ]).then(resp => Promise.all(resp.map(r => r.json())))
    //       .then(([videos, df]) => {
    //         setVideos(videos);
    //         comments.current = df;
    //         setLoaded(true);
    //         setOnlines(true);
    //       });
    //   });
  }, []);

  if (loaded === false) {
    return <div>Loading...</div>;
  }

  videos.sort();

  let rows = [];
  let index = 0;
  console.log(`Is online ? ${onlines}` )
  for (const video of videos) {
    index += 1;
    const src = `./Results-01-28/${video}`;
    rows.push(
      <tr key={video}>
        <td>{index}</td>
        <td>{video}</td>
        <td>
          <img src={src.replace("_action.mp4", "_input.png")} width={512}/>
        </td>
        <td>
          <video width={468} src={src} controls />
        </td>
        <td>
          <Select options={options}
            defaultValue={options.find(({ value }) => value === comments.current[video])}
            onChange={(e) => {
              if (onlines === false) { return; }
              comments.current[video] = e.value;
              console.log(comments.current[video]);
              fetch("http://localhost:10100/api/update_comment", {
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
          </td>
      </tr>
    )
  }
  return <table><tbody>{rows}</tbody></table>
}

export default App;
