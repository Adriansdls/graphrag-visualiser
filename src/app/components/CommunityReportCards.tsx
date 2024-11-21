// src/app/components/CommunityReportCards.tsx

import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Slider from "react-slick";
import { CommunityReport } from "../models/community-report";

interface CommunityReportCardsProps {
  communityReports: CommunityReport[];
}

const CommunityReportCards: React.FC<CommunityReportCardsProps> = ({ communityReports }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Slider {...settings}>
      {communityReports.map((report) => (
        <Card key={report.id} sx={{ margin: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {report.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {report.full_content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Slider>
  );
};

export default CommunityReportCards;