import React from 'react'
import { useLocation } from 'react-router-dom';

const DeveloperCreatesPatch = () => {
	const location=useLocation();
	const state =location.state;
	console.log(state);
  return (
    <>
      <div className="container">
		<div className=" text-center">
			<div className='my-5'>
				<form action="">
					<div className="container">
						<div className="row">
							<div className="col-12 col-lg-6 mx-auto">
								<div className="input-group mb-3 me-3 d-flex align-items-end">
									<label for="patchname">
										<h5> Request No : </h5>
									</label>
									<input type="number" id="RequestNo" className="form-control ms-2" placeholder={"Request No-" + state.data.requestno} readOnly/>
									<label className="input-group-text" for="RequestNo">Request No</label>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-lg-6 mx-auto">
								<div className="input-group mb-3 me-3 d-flex align-items-end">
									<label for="patchname">
										<h5> Upload : </h5>
									</label>
									<input type="file" className="form-control ms-2" id="inputGroupFile"/>
									<label className="input-group-text" for="inputGroupFile">Upload</label>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-lg-6 mx-auto">
								<div className="input-group mb-3 me-3 d-flex align-items-end">
									<label for="patchname">
										<h5> Patch Name : </h5>
									</label>
									<input type="text" id="patchname" className="form-control ms-2" placeholder="Patch name" />
									<label className="input-group-text" for="patchname">Patchname</label>
								</div>
							</div>
						</div>
						
						<div className="row">
							<div className="col-12 col-lg-6 mx-auto">
								<div className="input-group mb-3 me-3 d-flex align-items-center">
									<label for="patchplatform">
										<h5> Software or platform :</h5>
									</label>
									<input type="text" className="form-control ms-2" id="patchplatform" placeholder={state.data.software}  readOnly />
									
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-lg-6 mx-auto ">
								<div className="input-group mb-3 me-3 d-flex align-items-end">
									<label for="patchno">
										<h5> Patch No :  </h5>
									</label>
									<input className="form-control ms-2" type="number" id="patchno" value="0" readOnly/>
									<label className="input-group-text" for="patchno">Patch No</label>
								</div>
							</div>
						</div>
						<br/>
						<div className="row">
							<div className="col-12 col-lg-6 mx-auto">
								<div className="input-group mb-3 me-3 d-flex align-items-center">
									<label for="Features">
										<h5> Patch Features : </h5>
									</label>
									<textarea type='text' className="form-control ms-2" id="Features" name="Features" rows="5"
										cols="100" placeholder="Features"></textarea>
									
								</div>
							</div>
						</div>
						<div>
							<button className="btn btn-dark" type="button" onclick="registerpatchdetails()">Submit</button>
						</div>
                    </div>
				</form>
			</div>
		</div>
	</div>
    </>
  )
}

export default DeveloperCreatesPatch
