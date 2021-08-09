const shipFactory = (length) => {
  const hitArray = Array(length).fill(0);


  const hit = (position) => {
    hitArray[position] = 1;
  }

  const isSunk = () => {
    console.log(hitArray, 'hitArray');
    for (let i = 0; i < hitArray.length; i++) {
      if (hitArray[i] === 0) {
        return false;
      };
    }
    return true;
  }

  return {
    length, hitArray, hit, isSunk,
  };
}

export default shipFactory;