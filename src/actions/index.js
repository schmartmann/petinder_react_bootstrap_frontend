import axios from 'axios';



const ROOT_URL = 'http://api.petfinder.com/pet.find?'

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
  let savedPet = props.saved_pet;
  console.log("NICE", savedPet)

  //this is where savedPet goes to the database;

  let strWindowFeatures = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
  let petfinderUrl = "https://www.petfinder.com/adoption-inquiry/" + savedPet.pet_id;
  let petfinderWin = window.open(petfinderUrl, "_blank", strWindowFeatures);
  let nextPet = props.pets_batch.shift();
  let petsBatch = props.pets_batch;

  let payload = {
    nextPet: nextPet,
    petsBatch: petsBatch
  }
  return {
    type: SAVE_PET,
    payload: payload
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
    let user_zip ='';
    console.log(process.env.PF_KEY)
    const url = `${ROOT_URL}location=${user_zip}&output=full&format=json&key=${process.env.PF_KEY}`;
    const positionRequest = axios.get('http://ip-api.com/json').then(response => {
      // console.log(response.data.zip)
      user_zip = response.data.zip
    })
    const request = axios.get(url).then(response => {
      console.log("request from actions/index.js", response)
      dispatch(fetchMyPetOptimistic(response))
    });
    return null
  }
}
