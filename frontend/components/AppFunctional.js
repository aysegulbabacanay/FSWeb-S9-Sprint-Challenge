import React, { useState } from 'react'

// (1, 1) (2, 1) (3, 1)
// (1, 2) (2, 2) (3, 2)
// (1, 3) (2, 3) (3, 3)



//(y-1) * 3 + x -1 (3 satırdaki eleman sayısı)

export default function AppFunctional(props) {

 

const[konum,setKonum]=useState([2,2]);

const[hamleSayisi,setHamleSayisi]=useState(0);

const[mesaj,setMesaj]=useState("");
const [email, setEmail] = useState("");

const konumAsIndex = (konum[1]-1)*  3+ konum[0]- 1

// function sagaGit() {
//   setKonum(konum+1);
//   setHamleSayisi(hamleSayisi+1)
// }

function asagiGit() {
  if(konum[1]<3){ 
setKonum([konum[0],konum[1]+1]);
setHamleSayisi(hamleSayisi+1)
}
else{
  setMesaj("Aşağı gidemezsiniz.")
}
}
function yukariGit() {
  if(konum[1]>1){ 
setKonum([konum[0],konum[1]-1]);
setHamleSayisi(hamleSayisi+1)
}
else{
  setMesaj("Yukarı gidemezsiniz.")
}
}

function sagaGit() {
  if(konum[0]<3){
    setKonum ([konum[0]+1,konum[1]])
    setHamleSayisi(hamleSayisi + 1);
  }else{
    setMesaj("Sağa gidemezsiniz.");
  }
} 

function solaGit() {
  if(konum[0]>1){
    setKonum ([konum[0]-1,konum[1]])
    setHamleSayisi(hamleSayisi + 1);
  }else{
    setMesaj("Sola gidemezsiniz.");
  }
} 

function reset() {
  setKonum([2,2]);
  setHamleSayisi(0);
  setMesaj("");
  setEmail("");
}

function onChange(evt) {
  setEmail(evt.target.value);
}

const handleSubmit = (event) => {
  event.preventDefault();

  const obje = {
    x: konum[0],
    y: konum[1],
    steps: hamleSayisi,
    email: email,
  };
  // console.log(payload);
  axios
    .post("http://localhost:9000/api/result", obje)
    .then((res) => {
      console.log(res.data);
      
    })
    .catch((error) => {
      console.log("İşlenemez Varlık", error);
    });
};
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar ({konum.join(", ")})</h3>
      
        <h3 id="steps">{hamleSayisi} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            
            <div key={idx} className={`square${idx === konumAsIndex ? ' active' : ''}`}>
              {idx === konumAsIndex ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message" >{mesaj}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={solaGit} >SOL</button>
        <button id="up" onClick={yukariGit}>YUKARI</button>
        <button id="right"  onClick={sagaGit} >SAĞ</button>
        <button id="down" onClick={asagiGit}>AŞAĞI</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input id="email" type="email" placeholder="email girin" onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
