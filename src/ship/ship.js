const shipFactory = (length) => {
  const hitArray = Array(length).fill(0);


  const hit = (position) => {
    hitArray[position] = 1;
  }

  const isSunk = () => {
    for (const pos of hitArray) {
      if (hitArray[pos] === 0) {
        return false;
      }
    }
    return true;
  }

  return {
    length, hitArray, hit, isSunk,
  };
}

export default shipFactory;