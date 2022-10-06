import { Rate, Image, Typography, Button } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HeartOutlined } from "@ant-design/icons";

// CONTEXT
import FavouritePosts from "../context/FavouritePosts";
import LikedPosts from "../context/LikedPosts";

const { Title } = Typography;

function Card({ info, src }) {
  const [value, setValue] = useState(0);
  const [liked, setLiked] = useState(false);

  const desc = ["Ужасно", "Плохо", "Нормально", "Хорошо", "Отлично!"];

  const addCardForFavouritePosts = () => {
    FavouritePosts.push(info);
    localStorage.setItem("favourite", JSON.stringify(FavouritePosts));
  };

  const addCardForLikedPosts = () => {
    LikedPosts.push(info);
    setLiked(!liked);
    localStorage.setItem("liked", JSON.stringify(LikedPosts));
  };

  return (
    <div className="defaultCard">
      <div style={{ width: "500px", height: "auto", textAlign: "center" }}>
        <Image height={280} src={src} />
      </div>

      <span>
        <Title level={3}>Автор фотографии - {info.author}</Title>
        <Title level={3}>
          <a target="_blank" href={info.url} rel="noreferrer">
            Ссылка на профиль автора
          </a>
        </Title>
        <Button onClick={addCardForFavouritePosts}>Добавить в избранное</Button>
        <Button
          icon={<HeartOutlined />}
          onClick={addCardForLikedPosts}
          style={
            liked
              ? {
                  marginLeft: "10px",
                  marginRight: "10px",
                  color: "red",
                  border: "1px solid red",
                }
              : { marginLeft: "10px", marginRight: "10px", color: "blue" }
          }
        />
        <Rate tooltips={desc} onChange={setValue} value={value} />
        {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ""}
      </span>
    </div>
  );
}

const LikedPostsMainField = () => {
  let posts = JSON.parse(localStorage.getItem("liked")) || LikedPosts;
  console.log(posts)
  return (
    <div>
      {posts.length === 0 ? (
        <>
          <Title level={2}>Лайкните что-то</Title>
          <NavLink to="/">
            <Title level={3}>Перейти на главную</Title>
          </NavLink>
        </>
      ) : (
        <>
          <Title level={2}>Фотографии, которые вам понравились</Title>
          {posts.map((element) => {
            return (
              <Card
                key={element.id}
                src={element.download_url}
                info={element}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default LikedPostsMainField;
