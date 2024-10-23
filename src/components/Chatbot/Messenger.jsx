"use client";
import React from "react";
import { FacebookProvider, CustomChat } from "react-facebook";
function Messenger() {
  return (
    <FacebookProvider appId="3721280451471835" chatSupport>
      <CustomChat pageId="302261589638312" minimized={false} />
    </FacebookProvider>
  );
}

export default Messenger;
