import React, { useState, useEffect } from "react";
import { Layout, Menu, Row, Switch, Modal, Button } from 'antd';
import { CloseCircleOutlined, PlayCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import './App.less';

const { Header, Content, Sider } = Layout;

function App() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBook, setBook] = useState('');
  const [theme, setTheme] = useState('light');
  const [data, setData] = useState([]);

  const getData = () => {
    fetch('books.json', {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(function(response){
        return response.json();
      })
      .then(function(response) {
        setData(response)
      });
  }

  useEffect(() => {
    getData()
  }, [])

  const toggleTheme = () => {
    // if the theme is not light, then set it to dark
    if (theme === 'light') {
      setTheme('dark');
    // otherwise, it should be light
    } else {
      setTheme('light');
    }
  }

  const showModal = (book) => {
    setBook(book);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout className={`${theme}`}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={300}
      >
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.ItemGroup key="g1" title="Library">
              <Menu.Item key="1" icon={<PlayCircleOutlined />}>My Books</Menu.Item>
              <Menu.Item key="2" icon={<PlusCircleOutlined />}>Add New Books</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="g2" title="Settings">
              <Menu.Item key="3">
                Dark Mode <Switch checked={theme === 'dark' ? true : false} onChange={toggleTheme} />
              </Menu.Item>
            </Menu.ItemGroup>
        </Menu>
      </Sider>
      <Layout className="main-right-container">
        <Header className="site-layout-sub-header-background">
          <h1>Book Library</h1>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background">
            <Row gutter={[30, 30]}>
              {data && data.length > 0 && data.map( (book, index) =>
                <div className="col-4dot8" key={index}>
                  <div className="book-col">
                    <a onClick={() => showModal(book)}>
                      <div className="book-col-image-wrapper">
                        <img src={book.image} alt={book.title} style={{width: '100%'}} />
                        <span className="book-col-percentage">{`${book.percentage}%`}</span>
                        <span className="book-col-genre">{book.genre}</span>
                      </div>
                      <h3>{book.title}</h3>
                      <p>{book.author}</p>
                    </a>
                  </div>
                </div>
              )}
              <Modal closeIcon={<CloseCircleOutlined />} width={660} centered footer={null} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                {selectedBook !== '' &&
                  <div className="book-col-modal-wrapper">
                    <img src={selectedBook.image} alt={selectedBook.title} style={{maxWidth: 240, marginBottom: 42}} />
                    <h3>{selectedBook.title}</h3>
                    <p>{selectedBook.author}</p>
                    <p className="description">{selectedBook.description}</p>
                    <div className="book-col-modal-buttons">
                      <Button onClick={handleCancel}>Close</Button>
                      <Button type="primary">Continue Reading</Button>
                    </div>
                  </div>
                }
              </Modal>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
