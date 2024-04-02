import {test, expect} from '../resources/config/fixtures';
import Ajv from 'ajv';


test("GET Builds endpoint", async ({request}) =>{
    const response = await request.get("/api/builds");
    const responseBody = await response.json();
    console.log(await response.json());

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(responseBody['thief']).toBeDefined();
    expect(responseBody['knight']).toBeDefined();
    expect(responseBody['mage']).toBeDefined();
    expect(responseBody['brigadier']).toBeDefined();
})


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
    const response = await request.get("/api/builds");
    const responseBody = await response.json();
    const validate = ajv.compile(jsonSchema)
    const isValid = validate(responseBody)
    
    await expect(isValid).toBeTruthy();
})