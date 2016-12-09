import axios from 'axios';

const ROOT_URL = 'http://localhost:3000/api/v1'

export const FETCH_MY_PET  = "FETCH_MY_PET";
export const LOAD_PET = "LOAD_PET";
export const NEXT_PET = "NEXT_PET";
export const SAVE_PET = "SAVE_PET";

export function nextPetOptimistic(props){
  let nextPet = props.pet_batch.shift();
  let pets_batch = props.pet_batch;
  console.log("nextPet: ", nextPet);
  console.log("petsBatch: ", pets_batch);
  let payload = [nextPet, pets_batch];
  return {
    type: NEXT_PET,
    payload: payload
  }
}

export function nextPet(props){
  return function(dispatch){
    console.log("OKAY", props);
    dispatch(nextPetOptimistic(props))
    return null;
  }
}

export function savePet(props){
  console.log("NICE", props)
  let savedPet = props.current_pet;
  let nextPet = props.pet_batch[0];
  return {
    type: SAVE_PET,
    payload: nextPet
  }
}

export function fetchMyPetOptimistic(props){
  console.log("fetchMyPetOptimistic:", props.data)
  let pet = {
    current_pet : props.data.first[0],
    pet_batch: props.data.second
  };
  console.log(pet)
  return {
    type: LOAD_PET,
    payload: pet
  }
}

export function fetchMyPet(){
  return function(dispatch){
    const url = `${ROOT_URL}/pets`;
    const request = axios.get(url).then(response => {
      console.log("request from actions/index.js", response)
      dispatch(fetchMyPetOptimistic(response))
    });
    return null
  }
}
