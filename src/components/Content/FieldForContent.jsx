import { Content } from "antd/lib/layout/layout";
import { Pagination, Rate, Image, Typography, Button } from "antd";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { HeartOutlined } from "@ant-design/icons";

// COMPONENTS
import FavouritePostsMainField from "./FavouritePostsMainField";

// CONTEXTS
import FavouritePosts from "../context/FavouritePosts";
import LikedPosts from "../context/LikedPosts";

// FOR ASYNC REQUEST
import axios from "axios";

// CSS
import "../../styles/styles.css";
import LikedPostsMainField from "./LikedPostsMainField";

const { Title } = Typography;

function Card({ info, src }) {
  const [value, setValue] = useState(0);
  const [liked, setLiked] = useState(false);

  const desc = ["Ужасно", "Плохо", "Нормально", "Хорошо", "Отлично!"];

  const addCardForFavouritePosts = () => {
    FavouritePosts.push(info)
    localStorage.setItem('favourite', JSON.stringify(FavouritePosts));
  }

  const addCardForLikedPosts = () => {
    LikedPosts.push(info);
    setLiked(!liked);
    localStorage.setItem('liked', JSON.stringify(FavouritePosts));
  }

  return (
    <div className="defaultCard">
      <div style={{ width: "500px", height: "auto", textAlign: "center" }}>
        <Image height={280} src={src} />
      </div>

      <span>
        <Title level={3}>Автор фотографии - {info.author}</Title>
        <Title level={3}>
          <a target="_blank" href={info.url} rel="noreferrer" >
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


function FieldForContent() {
  const [countPosts, setCountPosts] = useState(10); // количество постов одновременно на странице по дефолту
  const [pageNumber, setPageNumber] = useState(1); // номер страницы с постами
  const [posts, setPosts] = useState([]); // все посты полученные с сервера

  useEffect(() => {
    axios
      .get(
        `https://picsum.photos/v2/list?page=${pageNumber}&limit=${countPosts}`
      )
      .then((res) => {
        setPosts(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [false]);

  const getPosts = (page, pageSize) => {
    setPageNumber(page);
    setCountPosts(pageSize);
    axios
      .get(`https://picsum.photos/v2/list?page=${page}&limit=${pageSize}`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Content
      className="site-layout-background"
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 300,
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div>
                {posts.map((element) => (
                  <Card
                    key={element.id}
                    src={element.download_url}
                    info={element}
                  />
                ))}
              </div>
              <Pagination
                total={1000}
                showTotal={(total) => `Больше ${total} фотографий`}
                defaultPageSize={countPosts}
                defaultCurrent={1}
                current={pageNumber}
                onChange={getPosts}
                onShowSizeChange={getPosts}
              ></Pagination>
            </>
          }
        />
        <Route path="/favourite" element={
          <FavouritePostsMainField />
        } />
        <Route path="/liked" element={
          <LikedPostsMainField />
        } />
      </Routes>
    </Content>
  );
}

export default FieldForContent;
