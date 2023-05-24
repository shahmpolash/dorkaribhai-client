import './App.css';
import Navbar from './Shared/Navbar';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import CreatClientProfile from './Pages/CreatClientProfile';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import RequireAuth from './Shared/RequireAuth';
import PostWork from './Pages/PostWork';
import WorkDetails from './Pages/WorkDetails';
import UpdateClientOrWorker from './Pages/UpdateClientOrWorker';
import CreateWorker from './Pages/CreateWorker';
import Dashboard from './Pages/Dashboard';
import SelectWorker from './Pages/SelectWorker';
import WorkerAcceptOrCancelWork from './Pages/WorkerAcceptOrCancelWork';
import CancelWorkByClient from './Pages/CancelWorkByClient';
import Deposit from './Pages/Deposit';
import DeliverNow from './Pages/DeliverNow';
import AcceptOrCancelDelivery from './Pages/AcceptOrCancelDelivery';
import PaymentTransferStatus from './Pages/Admin/PaymentTransferStatus';
import TransferPayment from './Pages/Admin/TransferPayment';
import PaymentRefundStatus from './Pages/Admin/PaymentRefundStatus';
import PaymentRefund from './Pages/Admin/PaymentRefund';
import ClientPostReviewToWorker from './Pages/ClientPostReviewToWorker';
import WorkerProfile from './Pages/WorkerProfile';
import ClientPendingOffers from './Pages/ClientPendingOffers';
import ClientCancelledOffer from './Pages/ClientCancelledOffer';
import RecentAppliedForWorker from './Pages/RecentAppliedForWorker';
import RecentCompleted from './Pages/RecentCompleted';
import RecentOfferReceived from './Pages/RecentOfferReceived';
import RecentCompletedWorker from './Pages/RecentCompletedWorker';
import CancelledWorkWorker from './Pages/CancelledWorkWorker';
import ClientProfile from './Pages/ClientProfile';
import WorkerPostReviewToClient from './Pages/WorkerPostReviewToClient';
import ClientToWorkerMessage from './Pages/ClientToWorkerMessage';
import WorkerToClientMessage from './Pages/WorkerToClientMessage';
import Inbox from './Pages/Inbox';

function App() {
  return (
    <div>
     <Navbar></Navbar>
     <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/create-client" element={<RequireAuth><CreatClientProfile></CreatClientProfile></RequireAuth>}></Route>
      <Route path="/create-worker" element={<RequireAuth><CreateWorker></CreateWorker></RequireAuth>}></Route>
      <Route path="/dashboard" element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}></Route>
      <Route path="/post-work" element={<RequireAuth><PostWork></PostWork></RequireAuth>}></Route>
      <Route path="/work/:id" element={<RequireAuth><WorkDetails></WorkDetails></RequireAuth>}></Route>
      <Route path="/worker/:id" element={<RequireAuth><WorkerProfile></WorkerProfile></RequireAuth>}></Route>
      <Route path="/client/:id" element={<RequireAuth><ClientProfile></ClientProfile></RequireAuth>}></Route>
      <Route path="/update" element={<RequireAuth><UpdateClientOrWorker></UpdateClientOrWorker></RequireAuth>}></Route>
      <Route path="/inbox" element={<RequireAuth><Inbox></Inbox></RequireAuth>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>

      <Route path="/select/:id" element={<RequireAuth><SelectWorker></SelectWorker></RequireAuth>}></Route>
      <Route path="/accept/:id" element={<RequireAuth><WorkerAcceptOrCancelWork></WorkerAcceptOrCancelWork></RequireAuth>}></Route>
      <Route path="/cancel/:id" element={<RequireAuth><CancelWorkByClient></CancelWorkByClient></RequireAuth>}></Route>
      <Route path="/deposit/:id" element={<RequireAuth><Deposit></Deposit></RequireAuth>}></Route>
      <Route path="/deliver-now/:id" element={<RequireAuth><DeliverNow></DeliverNow></RequireAuth>}></Route>
      <Route path="/accept-cancel/:id" element={<RequireAuth><AcceptOrCancelDelivery></AcceptOrCancelDelivery></RequireAuth>}></Route>
      <Route path="/review-to-worker/:id" element={<RequireAuth><ClientPostReviewToWorker></ClientPostReviewToWorker></RequireAuth>}></Route>
      <Route path="/review-to-client/:id" element={<RequireAuth><WorkerPostReviewToClient></WorkerPostReviewToClient></RequireAuth>}></Route>

      <Route path="/client-pending-offer" element={<RequireAuth><ClientPendingOffers></ClientPendingOffers></RequireAuth>}></Route>
      <Route path="/client-cancelled-offer" element={<RequireAuth><ClientCancelledOffer></ClientCancelledOffer></RequireAuth>}></Route>
      <Route path="/recent-completed-client" element={<RequireAuth><RecentCompleted></RecentCompleted></RequireAuth>}></Route>

      <Route path="/client-to-worker/:id" element={<RequireAuth><ClientToWorkerMessage></ClientToWorkerMessage></RequireAuth>}></Route>
      <Route path="/worker-to-client/:id" element={<RequireAuth><WorkerToClientMessage></WorkerToClientMessage></RequireAuth>}></Route>

      <Route path="/recent-applied" element={<RequireAuth><RecentAppliedForWorker></RecentAppliedForWorker></RequireAuth>}></Route>
      <Route path="/recent-offer-received" element={<RequireAuth><RecentOfferReceived></RecentOfferReceived></RequireAuth>}></Route>
      <Route path="/recent-cpmpleted-worker" element={<RequireAuth><RecentCompletedWorker></RecentCompletedWorker></RequireAuth>}></Route>
      <Route path="/cancelled-work-worker" element={<RequireAuth><CancelledWorkWorker></CancelledWorkWorker></RequireAuth>}></Route>  

      <Route path="/admin/payment-refund" element={<RequireAuth><PaymentRefundStatus></PaymentRefundStatus></RequireAuth>}></Route>
      <Route path="/admin/payment-transfer" element={<RequireAuth><PaymentTransferStatus></PaymentTransferStatus></RequireAuth>}></Route>
      <Route path="/admin/transfer-payment/:id" element={<RequireAuth><TransferPayment></TransferPayment></RequireAuth>}></Route>
      <Route path="/admin/refund-payment/:id" element={<RequireAuth><PaymentRefund></PaymentRefund></RequireAuth>}></Route>
     </Routes>
    </div>
  );
}

export default App;
