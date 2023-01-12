const anim = () => ( new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomInt  = Math.floor(Math.random() * 10);
      const randomChar = String.fromCharCode(65+Math.floor(Math.random() * 26))
      const randomPair = randomInt + randomChar;
      resolve(randomPair);
    }
    , 1000);
  }) ) ;

async function process(number) {
    let pass = "";
    for(let i = 0; i < number; i++){
        pass += await anim()
    }
    return pass;
}

process(10)
    .then( pass => console.log(pass))
    .catch(err => console.error(err));