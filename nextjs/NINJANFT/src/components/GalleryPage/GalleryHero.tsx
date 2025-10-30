function GalleryHero() {
  return (
    <div
      className="bg-gradient-light border-bottom"
      style={{ padding: "120px 20px 80px" }}
    >
      <div className="container text-center">
        <h1
          className="title text-primary mb-lg"
          style={{
            fontSize: "4.5rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          NINJA LABS NFT
        </h1>
        <p className="text-xl text-secondary font-medium m-0">
          100 unique digital collectibles living on the Injective blockchain
        </p>
      </div>
    </div>
  );
}

export default GalleryHero;
