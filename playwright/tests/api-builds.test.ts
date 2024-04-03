import {test, expect} from '../resources/config/fixtures';
import Ajv from 'ajv';
import { errorMessages } from '../resources/enums/errorMessages'


const buildURL = "/api/builds"
test("Validate JSON schema", async ({request}) =>{
    const jsonSchema = {
        "type": "object",
        "properties": {
            "thief": {
                "type": "object",
                "properties": {
                "weapon": { "type": "string" },
                "upgradedWeapon": { "type": "string" },
                "armor": { "type": "string" },
                "upgradedArmor": { "type": "string" },
                "strength": { "type": "integer" },
                "agility": { "type": "integer" },
                "wisdom": { "type": "integer" },
                "magic": { "type": "integer" }
                },
                "required": ["weapon", "upgradedWeapon", "armor", "upgradedArmor", "strength", "agility", "wisdom", "magic"]
            },
            "knight": {
                "type": "object",
                "properties": {
                "weapon": { "type": "string" },
                "upgradedWeapon": { "type": "string" },
                "armor": { "type": "string" },
                "upgradedArmor": { "type": "string" },
                "strength": { "type": "integer" },
                "agility": { "type": "integer" },
                "wisdom": { "type": "integer" },
                "magic": { "type": "integer" }
                },
                "required": ["weapon", "upgradedWeapon", "armor", "upgradedArmor", "strength", "agility", "wisdom", "magic"]
            },
            "mage": {
                "type": "object",
                "properties": {
                "weapon": { "type": "string" },
                "upgradedWeapon": { "type": "string" },
                "armor": { "type": "string" },
                "upgradedArmor": { "type": "string" },
                "strength": { "type": "integer" },
                "agility": { "type": "integer" },
                "wisdom": { "type": "integer" },
                "magic": { "type": "integer" }
                },
                "required": ["weapon", "upgradedWeapon", "armor", "upgradedArmor", "strength", "agility", "wisdom", "magic"]
            },
            "brigadier": {
                "type": "object",
                "properties": {
                "weapon": { "type": "string" },
                "upgradedWeapon": { "type": "string" },
                "armor": { "type": "string" },
                "upgradedArmor": { "type": "string" },
                "strength": { "type": "integer" },
                "agility": { "type": "integer" },
                "wisdom": { "type": "integer" },
                "magic": { "type": "integer" }
                },
                "required": ["weapon", "upgradedWeapon", "armor", "upgradedArmor", "strength", "agility", "wisdom", "magic"]
            }
    }};
  
    const ajv = new Ajv();
    const response = await request.get(buildURL);
    const responseBody = await response.json();
    const validate = ajv.compile(jsonSchema)
    const isValid = validate(responseBody)
    
    expect(isValid).toBeTruthy();
})



test("GET /api/builds", async ({request}) =>{
    const response = await request.get(buildURL);
    const responseBody = await response.json();
    // console.log(await response.json());

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(responseBody['thief']).toBeDefined();
    expect(responseBody['knight']).toBeDefined();
    expect(responseBody['mage']).toBeDefined();
    expect(responseBody['brigadier']).toBeDefined();
})


test("POST /api/builds valid character", async({ request }) =>{
    const newCharacter = {
        "build": {
          "name": "TEST_GURU",
          "strength": 5,
          "agility": 2,
          "wisdom": 2,
          "magic": 1
        }
      }
    const postResponse = await request.post(buildURL, {
        data: newCharacter
    })
    const postResponseBody = await postResponse.json()

    expect(postResponse).toBeOK();
    expect(postResponse.status()).toBe(201);
    expect(postResponseBody['result']).toEqual(newCharacter);
})


test("POST /api/builds invalid integer input", async({ request }) =>{
    const newCharacter = {
        "build": {
          "name": "TEST_GURU",
          "strength": "5",
          "agility": 2,
          "wisdom": 2,
          "magic": 1
        }
      }
    const postResponse = await request.post(buildURL, {
        data: newCharacter
    })
    const postResponseBody = await postResponse.json()

    expect(postResponse.status()).toBe(400);
    expect(postResponseBody.error[0].message).toEqual(errorMessages.expectedNumber);
})

test("POST /api/builds invalid string input", async({ request }) =>{
    const newCharacter = {
        "build": {
          "name": 4545,
          "strength": 4.3,
          "agility": 2,
          "wisdom": 2,
          "magic": 1
        }
      }
    const postResponse = await request.post(buildURL, {
        data: newCharacter
    })
    const postResponseBody = await postResponse.json()

    expect(postResponse.status()).toBe(400);
    expect(postResponseBody.error[0].message).toEqual(errorMessages.expectedString);
})


test("POST /api/builds exceeds max stats value", async({ request }) =>{
    const newCharacter = {
        "build": {
          "name": "TESTGURU",
          "strength": 5,
          "agility": 3.5,
          "wisdom": 2.5,
          "magic": 1
        }
      }
    const postResponse = await request.post(buildURL, {
        data: newCharacter
    })
    const postResponseBody = await postResponse.json()

    expect(postResponse.status()).toBe(400);
    expect(postResponseBody.error[0].message).toEqual(errorMessages.exceedMaxValueStats);
})