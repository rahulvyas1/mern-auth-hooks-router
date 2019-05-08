import React from 'react';

const Form = () => {
  return (
    <div className="section is-fullheight">
      <div className="container">
        <div className="column is-4 is-offset-4">
          <div className="box">
            <form>
              <div className="field">
                <label className="label">Email Address</label>
                <div className="control">
                  <input className="input" type="email" name="email" required />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input className="input" type="password" name="password" required />
                </div>
              </div>
              <button type="submit" className="button is-block is-info is-fullwidth">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;