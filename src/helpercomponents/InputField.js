import { InputBase, InputLabel } from "@mui/material";
const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 8;
import styled from "@emotion/styled";

const InputComponentStyled = styled.div`
  padding-top: 21px;
  width: 100%;

  input {
    ::placeholder,
    ::-webkit-input-placeholder {
      opacity: 1;
    }
    :-ms-input-placeholder {
      opacity: 1;
    }
  }
  .input-text,
  .input-select {
    color: #636b81;
    width: 100%;
    background: #f5f6f7;
    padding: 0 10px;
    height: 44px;
    align-items: center;
    border-radius: 4px;
    box-shadow: none;
    font-size: 14px;
    line-height: 14px;
    border: ${(props) => (props.error ? `1px solid red` : "none")};

    .MuiInputBase-input {
      padding-bottom: 2px;
    }
    .token-logo {
      max-width: 20px;
      border-radius: 50%;
    }
  }
  .MuiInput-root {
    &:before {
      border-bottom: none;
    }
    &:hover {
      &:before {
        border-bottom: none !important;
      }
    }
    &:after {
      border-bottom: none;
    }
  }

  .MuiSelect-icon {
    margin-right: 10px;
  }
  .label-text {
    margin-bottom: 5px;
    font-size: 12px;
    line-height: 12px;
    color: #636b81;
    font-weight: 500;
  }
  .identicon {
    border-radius: 50%;
  }

  .required-field {
    font-size: 12px;
    color: #ee365a;
    font-weight: 400;
    line-height: 12px;
    letter-spacing: 0px;
    text-align: left;
  }
`;

const InputComponent = (props) => {
  return (
    <InputComponentStyled
      style={{
        ...props.wrapperStyle,
      }}
      className="input-styled"
      error={props.error}
    >
      {props.label ? (
        <InputLabel
          sx={{ ...props.styles, lineHeight: "17px", whiteSpace: "pre-line" }}
          className="label-text"
          shrink={false}
        >
          {props.label}
          {props.required && <span style={{ color: "red" }}>*</span>}
        </InputLabel>
      ) : null}

      <>
        <InputBase
          {...props}
          className="input-text"
          style={{ ...props.inputStyles }}
        />
      </>
    </InputComponentStyled>
  );
};

export default InputComponent;
