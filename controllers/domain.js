import express from "express";
import AWS from "aws-sdk";

const route53 = new AWS.Route53();

const addDomain = async (req, res) => {
  const { domainName, callerReference, comment } = req.body;
  console.log(domainName, callerReference, comment);

  if (!domainName || !callerReference) {
    return res
      .status(400)
      .json({ error: "Domain name and caller reference are required" });
  }

  const params = {
    Name: domainName,
    CallerReference: callerReference,
    HostedZoneConfig: {
      Comment: comment || `Hosted zone for ${domainName}`,
    },
  };

  try {
    
    const data = await route53.createHostedZone(params).promise();
    const isCallerReferenceUnique = !hostedZones.HostedZones.some(
      (zone) => zone.CallerReference === callerReference
    );

    if (!isCallerReferenceUnique) {
      return res.status(400).json({ error: "Caller reference must be unique" });
    }
    res.status(201).json(data);
  } catch (error) {
    console.error("Error creating hosted zone:", error);
    res.status(500).json({ error: error.message });
  }
};

const getDomain = async (req, res) => {
  try {
    const data = await route53.listHostedZones().promise();
    res.status(200).json(data.HostedZones);
  } catch (error) {
    console.error("Error listing hosted zones:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteDomain = async (req, res) => {
  try {
    const { hostedZoneId } = req.body;

    if (!hostedZoneId) {
      return res.status(400).json({ error: "HostedZoneId is required" });
    }

    const params = {
      Id: hostedZoneId,
    };

    try {
      const data = await route53.deleteHostedZone(params).promise();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error deleting hosted zone:", error);
      res.status(500).json({ error: error.message });
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Unexpected error occurred" });
  }
};

const getHostedZone = async (req, res) => {
  const { id } = req.body;

  const params = {
    Id: id,
  };
  console.log(params);
  try {
    const data = await route53.getHostedZone(params).promise();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error retrieving hosted zone:", error);
    res.status(500).json({ error: error.message });
  }
};

const getRecords = async (req, res) => {
  const { id } = req.body;

  const params = {
    HostedZoneId: id,
  };

  try {
    const data = await route53.listResourceRecordSets(params).promise();
    res.status(200).json(data.ResourceRecordSets);
  } catch (error) {
    console.error("Error retrieving DNS records:", error);
    res.status(500).json({ error: error.message });
  }
};

export { addDomain, getDomain, deleteDomain, getHostedZone, getRecords };
