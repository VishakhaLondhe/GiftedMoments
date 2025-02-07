import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import gift_hero1 from "../assets/gift-hero1.jpg";
import gift_hero2 from "../assets/gift-hero2.jpg";
import gift_hero3 from "../assets/gift-hero3.jpeg";

import product1 from "../assets/product1.webp";
import product2 from "../assets/product2.avif";
import product3 from "../assets/product3.webp";
import product4 from "../assets/product4.jpeg";
import product5 from "../assets/product5.webp";
import seller1 from "../assets/seller1.jpg";

function HomePage() {
  useEffect(() => {
    document.getElementById("container")?.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div
        id="giftCarousel"
        className="carousel slide mb-6"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={gift_hero1}
              className="d-block w-100"
              alt="Gifting Made Special"
            />
            <div className="carousel-caption text-start text-black">
              <h1>Find the Perfect Gift for Every Moment</h1>
              <p>
                Personalized gifts, seamless shopping, and hassle-free delivery.
              </p>
              <p>
                <Link className="btn btn-lg btn-warning" to="/shop">
                  Start Shopping
                </Link>
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={gift_hero2}
              className="d-block w-100"
              alt="Custom Gifts for Loved Ones"
            />
            <div className="carousel-caption text-black">
              <h1>Make Every Gift Unique</h1>
              <p>
                Customize your presents with heartfelt messages & creative
                designs.
              </p>
              <p>
                <Link className="btn btn-lg btn-warning" to="/customize">
                  Customize Now
                </Link>
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={gift_hero3}
              className="d-block w-100"
              alt="Sell Your Creations"
            />
            <div className="carousel-caption text-end text-blacks">
              <h1>Sell Your Unique Creations</h1>
              <p>Join us as a seller & reach thousands of gift buyers.</p>
              <p>
                <Link className="btn btn-lg btn-warning" to="/sell">
                  Start Selling
                </Link>
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#giftCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#giftCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <section className="container my-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="row g-5 justify-content-center">
          {[1, 2, 3, 4, 5].map((item) => (
            <div className="col-md-4 col-lg-3" key={item}>
              <div className="card h-100 shadow">
                <img
                  src={
                    [product1, product2, product3, product4, product5][item - 1]
                  }
                  className="card-img-top"
                  height="200px"
                  alt={`Gift Item ${item}`}
                />
                <div className="card-body text-center ">
                  <h5 className="card-title">
                    {
                      [
                        "Personalized Photo Frame",
                        "Custom Engraved Jewelry",
                        "Birthday Surprise Box",
                        "Anniversary Memory Book",
                        "Customized T-Shirts",
                      ][item - 1]
                    }
                  </h5>
                  <p className="card-text small">
                    {
                      [
                        "Upload your favorite memory",
                        "Laser engraved with names/dates",
                        "Curated gift collection",
                        "Custom timeline of your relationship",
                        "Full-color digital printing",
                        "Custom labels with your message",
                      ][item - 1]
                    }
                  </p>
                  <Link to="/shop" className="btn btn-warning btn-sm">
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Gifts Section */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Trending Gifts</h2>
        <div className="row g-4">
          {[].map((product) => (
            <div className="col-md-4 col-lg-3" key={product.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5>{product.name}</h5>
                  <p className="text-muted small mb-2">{product.desc}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-warning">${product.price}</span>
                    <Link to="/shop" className="btn btn-outline-warning btn-sm">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customization Options Section */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Customize Your Gift</h2>
        <div className="row g-4 text-center">
          <div className="col-md-3">
            <div className="p-3 border bg-light rounded">
              <i className="bi bi-fonts fs-1 text-warning"></i>
              <h5>Text Engraving</h5>
              <p className="small">Add names, dates, or special messages</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 border bg-light rounded">
              <i className="bi bi-image fs-1 text-warning"></i>
              <h5>Photo Upload</h5>
              <p className="small">Print your favorite photos on products</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 border bg-light rounded">
              <i className="bi bi-palette fs-1 text-warning"></i>
              <h5>Color Options</h5>
              <p className="small">Choose from 50+ color combinations</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 border bg-light rounded">
              <i className="bi bi-gift fs-1 text-warning"></i>
              <h5>Gift Wrapping</h5>
              <p className="small">Premium wrapping with custom notes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Occasions Section */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Shop by Occasion</h2>
        <div className="row g-4">
          {[
            {
              title: "Weddings",
              desc: "Find perfect wedding favors and bridal party gifts",
              icon: "bi-heart",
            },
            {
              title: "Birthdays",
              desc: "Personalized gifts for all ages",
              icon: "bi-balloon",
            },
            {
              title: "Anniversaries",
              desc: "Celebrate milestones with custom keepsakes",
              icon: "bi-calendar-heart",
            },
            {
              title: "Corporate Gifts",
              desc: "Branded merchandise for employees and clients",
              icon: "bi-briefcase",
            },
          ].map((occasion, index) => (
            <div className="col-md-3 " key={index + 1}>
              <div className="card h-100 shadow-sm ">
                <div className="card-body text-center d-flex flex-column justify-content-evenly">
                  <i className={`bi ${occasion.icon} fs-1 text-warning`}></i>
                  <h5>{occasion.title}</h5>
                  <p className="small text-muted">{occasion.desc}</p>
                  <Link to="/shop" className="btn btn-link text-warning">
                    Shop Now →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seller Highlights Section */}
      <section className="container my-5 bg-light py-5">
        <h2 className="text-center mb-4">Become a Seller</h2>

        <div className="row g-4">
          <div className="col-md-6">
            <img src={seller1} alt="" className="w-100" />
          </div>
          <div className="col-md-6">
            <div className="card h-100 border-warning">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="text-warning">Why Sell With Us?</h5>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <i className="bi bi-check2-circle me-2 text-success"></i>{" "}
                    Low10% commission fee
                  </li>
                  <li className="mb-3">
                    <i className="bi bi-check2-circle me-2 text-success"></i>{" "}
                    Free seller training program
                  </li>
                  <li className="mb-3">
                    <i className="bi bi-check2-circle me-2 text-success"></i>{" "}
                    Marketing support & promotions
                  </li>
                  <li className="mb-3">
                    <i className="bi bi-check2-circle me-2 text-success"></i>{" "}
                    Real-time sales analytics
                  </li>
                  <li>
                    <i className="bi bi-check2-circle me-2 text-success"></i>{" "}
                    Secure payment processing
                  </li>
                </ul>
                <button className="btn btn-outline-warning ">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Customer Reviews</h2>
        <div className="row g-4">
          {[
            {
              quote:
                "The quality exceeded my expectations! Perfect gift for my parents' anniversary.",
              author: "Emily Rodriguez",
              rating: 5,
            },
            {
              quote:
                "Super easy customization process. My friend loved the personalized journal!",
              author: "David Chen",
              rating: 5,
            },
            {
              quote:
                "Fast shipping and excellent customer service. Will definitely order again!",
              author: "Sophia Patel",
              rating: 5,
            },
            {
              quote:
                "Best place for unique corporate gifts. Our clients were impressed!",
              author: "Michael O'Connor",
              rating: 5,
            },
            {
              quote:
                "The photo blanket I ordered is so soft and the print quality is amazing.",
              author: "Lisa Nguyen",
              rating: 5,
            },
            {
              quote:
                "Great prices for personalized items. Found perfect teacher appreciation gifts!",
              author: "Brian Wilson",
              rating: 5,
            },
          ].map((review, index) => (
            <div className="col-md-6 col-lg-4" key={index + 1}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <i
                        key={i + 1}
                        className="bi bi-star-fill text-warning me-1"
                      ></i>
                    ))}
                  </div>
                  <blockquote className="blockquote mb-0">
                    <p className="small">&quot;{review.quote}&quot;</p>
                    <footer className="blockquote-footer mt-3">
                      {review.author}
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
