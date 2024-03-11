export default function WaitlistWidget() {
    return (
      <div>
        <iframe
          srcDoc={`
             <div id="getWaitlistContainer" className="mt-10" data-waitlist_id="13923"></div>
             <link rel="stylesheet" type="text/css" href="https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.css" />
             <script async src="https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.js"></script>
           `}
          className="w-full h-80 mt-10"
        />
      </div>
    );
  }
