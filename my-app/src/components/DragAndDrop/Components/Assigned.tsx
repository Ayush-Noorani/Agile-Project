import styled from "@emotion/styled";

interface AssignedProps {
  data: {
    name: string;
    img: string;
    email: string;
  }[];
}

export const Assigned = ({ data }: AssignedProps) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      alignSelf: "baseline",
    }}
  >
    {data.length > 3
      ? data
          .slice(0, 3)
          .map((item) => (
            <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              width={"30px"}
              height={"30px"}
              style={{ backgroundColor: "grey", borderRadius: "50px" }}
              loading="lazy"
            />
          ))
          .concat(
            <div
              style={{
                backgroundColor: "grey",
                borderRadius: "50px",
                width: "30px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: "30px",
                color: "white",
              }}
            >
              {data.length - 3}+
            </div>
          )
      : data.map((item) => (
          <img
            src={`${item.img}`}
            srcSet={`${item.img}`}
            width={"50px"}
            height={"50px"}
            style={{ backgroundColor: "grey", borderRadius: "50px" }}
            alt={item.name}
            loading="lazy"
          />
        ))}
  </div>
);
