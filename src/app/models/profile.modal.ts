import { ProfileInt } from "../types/profile-response.type";

export class Profile {
    private experience: number;
    private id: number;
    private location: string;
    private mobileno: number;
    private name: string;
    private skill1: string;
    private skill2: string;
    private vendor: string;


    
    deserialize(input: ProfileInt): this {
        Object.assign(this, input);
        return this;
    }
    get getExperience() {
        return this.experience;
    }

    set setExperience(experience: number) {
        this.experience = experience;
    }

    get getId(): number {
        return this.id;
    }

    set setId(id: number) {
        this.id = id;
    }

    get getLocation(): string {
        return this.location;
    }

    set setLocation(location: string) {
        this.location = location;
    }

    get getMobileno(): number {
        return this.mobileno;
    }

    set setMobileno(mobileno: number) {
        this.mobileno = mobileno;
    }

    get getName(): string {
        return this.name;
    }

    set setName(name: string) {
        this.name = name;
    }

    get getSkill1(): string {
        return this.skill1;
    }

    set setSkill1(skill1: string) {
        this.skill1 = skill1;
    }

    get getSkill2(): string {
        return this.skill2;
    }

    set setSkill2(skill2: string) {
        this.skill2 = skill2;
    }

    get getVendor(): string {
        return this.vendor;
    }

    set setVendor(vendor: string) {
        this.vendor = vendor;
    }
}


export class Profiles {
    private profiles: Map<string, Profile>;

    deserialize(input: ProfileInt): this {
        // console.log("model",input)
        // console.log("model",input.profiles)
        if (input) {
        // console.log("if model",typeof input)

            const map = new Map<string, Profile>();
            // console.log(input)      
            input.forEach((profile: ProfileInt) => {
                map.set(`${profile.id}`, new Profile().deserialize(profile));
            });
            this.profiles = map;
        }
        return this;
    }

    get getProfiles() {
        return this.profiles;
    }

    set setProfiles(profiles: Map<string, Profile>) {
        this.profiles = profiles;
    }
}