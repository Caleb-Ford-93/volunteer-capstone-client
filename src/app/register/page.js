import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

export default function RegisterChoice() {
    return <>
    <div className="flex flex-col m-10 flex-wrap gap-8 items-center">
      <Button as={Link} href="/register/volunteer" color="success" size="md">
        I am a Volunteer, looking for opportunities
      </Button>
      <Button as={Link} href="/register/organization" color="secondary" size="md">
        I represent an Organization, looking for Volunteers
      </Button>  
    </div>
    </>
}