import './App.css';
import React, { useRef, useEffect } from 'react'
import Select from 'react-select'

// const _url_arr = window.location.href.split('/');
// const version_name = _url_arr[_url_arr.length - 2]; // 'results-Jan-29';
const version_name = 'Results-01-28';
// const version_name = 'results-Jan-29';
const hostname = '45.76.11.163';
const port = 8000;

const options = [
  { value: 'Unfinished', label: 'NotCheck' },
  { value: 'Success', label: 'Success' },
  { value: 'FrankMocap', label: 'FrankMocap' },
  { value: 'ObjMask', label: 'ObjMask' },
  { value: 'CAD', label: 'CAD' },
  { value: 'BadLabel', label: 'BadLabel' },
  { value: 'Unexplained', label: 'Unexplained' },
]

function App() {
  const [loaded, setLoaded] = React.useState(false);
  let comments = useRef(null);

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
      });
  }, []);

  if (!loaded) {
    return <div>loading...</div>
  }

  let videos = Object.keys(comments.current);
  videos.sort();

  let rows = [];
  let index = 0;
  for (const video of videos) {
    index += 1;
    const src = `./${version_name}/${video}`;
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
    rows.push(
      <tr key={video}>
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
    )
  }
  return <table><tbody>{rows}</tbody></table>
}

export default App;
