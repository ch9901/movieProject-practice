import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  // background: #000;
  font-size: 18px;
  font-size: 1.1rem;
  color: #000;
  color: #fff;
`;
const Col = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled(motion.svg)`
  margin: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  transition: 0.1s;
`;
const Items = styled.ul`
  display: flex;
  align-items: center;
`;
const Item = styled.li`
  margin-right: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:hover {
    color: ${(props) => props.theme.red};
  }
`;
const Circle = styled.span`
  width: 6px;
  height: 6px;
  background: ${(props) => props.theme.red};
  border-radius: 10px;
  position: absolute;
  bottom: -15px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;
const Search = styled.form`
  color: #fff;
  margin-right: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  svg {
    height: 20px;
    margin-right: 10px;
  }
`;
const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0;
  border: none;
  padding: 10px 50px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;
const logoVariants = {
  normal: { fillOpacity: 1, stroke: "none" },
  active: { fillOpacity: 0, stroke: "#fff", strokeWidth: "6px" },
};
const navVariants = {
  top: { background: "rgba(0,0,0,0)" },
  scroll: { background: "rgba(0,0,0,1)" },
};
interface IForm {
  keyword: string;
}
const Header = () => {
  const { register, handleSubmit } = useForm<IForm>();
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  useEffect(() => {
    scrollY.on("change", () => {
      console.log("ScrollY.get() : ", scrollY.get());
      if (scrollY.get() > 128) {
        navAnimation.start({
          background: "rgba(0,0,0,1)",
        });
      } else {
        navAnimation.start({
          background: "rgba(0,0,0,0)",
        });
      }
    });
  }, [scrollY]);
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start("scroll");
    } else {
      inputAnimation.start("top");
    }
    setSearchOpen((prev) => !prev);
  };
  const onValid = (data: IForm) => {
    console.log(data);
    navigate(`/search?keyword=${data.keyword}`);
  };
  return (
    <Nav variants={navVariants} animate={navAnimation} initial="top">
      <Col>
        <Link to={"/"}>
          <Logo
            variants={logoVariants}
            initial="normal"
            whileHover="active"
            end="end"
            xmlns="http://www.w3.org/2000/svg"
            width="1024"
            height="276.742"
            viewBox="0 0 1024 276.742"
          >
            <path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
          </Logo>
        </Link>
        <Items>
          <Item>
            <Link to="/">Home{homeMatch && <Circle />}</Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)} onClick={toggleSearch}>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            <motion.path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </motion.svg>
          <Input
            as={"input"}
            {...register("keyword", { required: true, minLength: 2 })}
            transition={{ type: "linear" }}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            placeholder="Search for movie or Tv show..."
          />
        </Search>
      </Col>
    </Nav>
  );
};

export default Header;
