<ServicesContainer>
  {windowWidth >= 1300 ? (
    <>
      <Service>
        <CardServiceMinimal className="cardServices" onClick={OpenSimulation}>
          <ColumnContainer style={{ textAlign: "left", padding: 30 }}>
            <h3>Simulation</h3>
            <p>
              Tool will help your company to carry out metals commercialization
              Worldwide
            </p>
            <span>Know more</span>
          </ColumnContainer>
          <RowContainer style={{ position: "absolute", width: 150 }}>
            <ImgDefault
              src={ServiceMenuSimulator}
              style={{ marginLeft: 100 }}
            />
          </RowContainer>
        </CardServiceMinimal>
      </Service>

      <Service>
        <CardServiceMinimal className="cardServices" onClick={OpenMarket}>
          <ColumnContainer style={{ textAlign: "left", padding: 30 }}>
            <h3 size="20px" color="#4b4b4b">
              Market Intelligence
            </h3>
            <p>
              On this page you can search for any metal and view the prices of
              the last three days
            </p>
            <span>Know more</span>
          </ColumnContainer>
          <RowContainer style={{ position: "absolute", width: 110 }}>
            <ImgDefault
              src={ServiceMenuMetalPrice}
              style={{ marginLeft: 100, marginTop: 10 }}
            />
          </RowContainer>
        </CardServiceMinimal>
      </Service>

      <Service>
        <CardServiceMinimal
          className="cardServices"
          onClick={() => navigate("/my-company")}
        >
          <ColumnContainer style={{ textAlign: "left", padding: 30 }}>
            <h3 size="20px" color="#4b4b4b">
              My Company
            </h3>
            <p>
              Access the My Company dashboard to manage your company on the
              platform.
            </p>
            <span>Know more</span>
          </ColumnContainer>
          <RowContainer style={{ position: "absolute", width: 140 }}>
            <ImgDefault src={ServiceMyCompany} style={{ marginLeft: 100 }} />
          </RowContainer>
        </CardServiceMinimal>
      </Service>

      <Service>
        <CardServiceMinimal
          className="cardServices"
          onClick={() => navigate("/sustainability")}
        >
          <ColumnContainer style={{ textAlign: "left", padding: 30 }}>
            <h3 size="20px" color="#4b4b4b">
              Sustainability
            </h3>
            <p>
              Fill out your sustainability form for certification within the
              platform.
            </p>
            <span>Know more</span>
          </ColumnContainer>
          <RowContainer style={{ position: "absolute", width: 140 }}>
            <ImgDefault src={ServiceSus} style={{ marginLeft: 100 }} />
          </RowContainer>
        </CardServiceMinimal>
      </Service>
    </>
  ) : (
    <Swiper
      spaceBetween={8}
      slidesPerView={"auto"}
      onSlideChange={(swiper) => {
        setSliderState2({
          isBeginning: swiper.isBeginning,
          isEnd: swiper.isEnd,
        });
      }}
    >
      <header
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
        slot="container-start"
      >
        <SliderNavigation
          isBeginning={sliderState2.isBeginning}
          isEnd={sliderState2.isEnd}
        />
      </header>

      <SwiperSlide key={"Simulation"}>
        <Service>
          <CardServiceMinimal className="cardServices" onClick={OpenSimulation}>
            <ColumnContainer style={{ textAlign: "left" }}>
              <h3 size="20px" color="#4b4b4b">
                Simulation
              </h3>
              <p>
                Tool will help your company to carry out metals
                commercialization Worldwide
              </p>
              <TextDefault size="16px" color="#366dfb">
                Know more
              </TextDefault>
            </ColumnContainer>
            <RowContainer style={{ position: "absolute", width: 150 }}>
              <ImgDefault
                src={ServiceMenuSimulator}
                style={{ marginLeft: 100 }}
              />
            </RowContainer>
          </CardServiceMinimal>
        </Service>
      </SwiperSlide>

      <SwiperSlide key={"Market"}>
        <Service>
          <CardServiceMinimal className="cardServices" onClick={OpenMarket}>
            <ColumnContainer style={{ textAlign: "left" }}>
              <h3 size="20px" color="#4b4b4b">
                Market Intelligence
              </h3>
              <p>
                On this page you can search for any metal and view the prices of
                the last three days
              </p>
              <TextDefault size="16px" color="#366dfb">
                Know more
              </TextDefault>
            </ColumnContainer>
            <RowContainer style={{ position: "absolute", width: 110 }}>
              <ImgDefault
                src={ServiceMenuMetalPrice}
                style={{ marginLeft: 100, marginTop: 10 }}
              />
            </RowContainer>
          </CardServiceMinimal>
        </Service>
      </SwiperSlide>

      <SwiperSlide key={"Company"}>
        <Service>
          <CardServiceMinimal
            className="cardServices"
            onClick={() => navigate("/my-company")}
          >
            <ColumnContainer style={{ textAlign: "left" }}>
              <h3 size="20px" color="#4b4b4b">
                My Company
              </h3>
              <p>
                Access the My Company dashboard to manage your company on the
                platform.
              </p>
              <TextDefault size="16px" color="#366dfb">
                Know more
              </TextDefault>
            </ColumnContainer>
            <RowContainer style={{ position: "absolute", width: 140 }}>
              <ImgDefault src={ServiceMyCompany} style={{ marginLeft: 100 }} />
            </RowContainer>
          </CardServiceMinimal>
        </Service>
      </SwiperSlide>

      <SwiperSlide key={"Sustainability"}>
        <Service>
          <CardServiceMinimal
            className="cardServices"
            onClick={() => navigate("/sustainability")}
          >
            <ColumnContainer style={{ textAlign: "left" }}>
              <h3 size="20px" color="#4b4b4b">
                Sustainability
              </h3>
              <p>
                Fill out your sustainability form for certification within the
                platform.
              </p>
              <TextDefault size="16px" color="#366dfb">
                Know more
              </TextDefault>
            </ColumnContainer>
            <RowContainer style={{ position: "absolute", width: 140 }}>
              <ImgDefault src={ServiceSus} style={{ marginLeft: 100 }} />
            </RowContainer>
          </CardServiceMinimal>
        </Service>
      </SwiperSlide>
    </Swiper>
  )}
</ServicesContainer>;
