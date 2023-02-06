import { User } from "../../types/common";

function createData(
  username: string,
  name: string,
  email: string,
  position: string
): User {
  return {
    id: username,
    name: name,
    email: email,
    role: position,
  };
}

const rows = [
  createData("test123", "Cupcake Frances", "xyz@wer.com", "Front-End Dev"),
  createData("test124", "Donut Dilip", "abz@wedddr.com", "Back-End Dev"),
  createData("test125", "Eclair Swaggot", "fccs@mm.com", "Back-End Dev"),
  createData("test126", "Frozen  yoghurt", "frexn@rr.com", "Front-End Dev"),
  createData("test127", "Gingerbread yoghurt", "frexn@rr.com", "Front-End Dev"),
  createData("test128", "Honeycomb yoghurt", "frexn@rr.com", "Front-End Dev"),
  createData(
    "rajeevDevsai69",
    "Ice cream sandwich yoghurt",
    "frexn@rr.com",
    "Front-End Dev"
  ),
  createData("nones991", "Jelly Bean yoghurt", "frexn@rr.com", "Front-End Dev"),
  createData("nones993", "KitKat yoghurt", "frexn@rr.com", "Front-End Dev"),
  createData("nones994", "Lollipop yoghurt", "frexn@rr.com", "Front-End Dev"),
  createData(
    "nones996",
    "Marshmallow yoghurt",
    "frexn@rr.com",
    "Front-End Dev"
  ),
  createData("nones998", "Nougat yoghurt", "frexn@rr.com", "Front-End Dev"),
  createData("nones9911", "Oreo yoghurt", "frexn@rr.com", "Front-End Dev"),
];

export { rows };
